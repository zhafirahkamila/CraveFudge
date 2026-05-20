import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  axiosInstance,
  setAuthHandles,
  resetRefreshState,
  unwrap,
  extractApiError,
} from "../lib/axios";
import { useToast } from "./ToastContext";

const REFRESH_STORAGE_KEY = "cravefudge_refresh";
const ACCESS_STORAGE_KEY = "cravefudge_access";
const USER_STORAGE_KEY = "cravefudge_user";

const safeStorageGet = (key) => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    if (value == null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — ignore */
  }
};

const readStoredRefresh = () => safeStorageGet(REFRESH_STORAGE_KEY);
const writeStoredRefresh = (token) => safeStorageSet(REFRESH_STORAGE_KEY, token);

const readStoredAccess = () => safeStorageGet(ACCESS_STORAGE_KEY);
const writeStoredAccess = (token) => safeStorageSet(ACCESS_STORAGE_KEY, token);

const readStoredUser = () => {
  const raw = safeStorageGet(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};
const writeStoredUser = (user) => {
  if (user == null) safeStorageSet(USER_STORAGE_KEY, null);
  else safeStorageSet(USER_STORAGE_KEY, JSON.stringify(user));
};

const buildLoginCredentials = (identifierRaw, password) => {
  const value = (identifierRaw ?? "").trim();
  if (!value) return { password };
  if (value.includes("@")) return { email: value, password };
  return { phone_number: value.replace(/\s+/g, ""), password };
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [accessToken, setAccessToken] = useState(readStoredAccess);
  const [isBootstrapping, setIsBootstrapping] = useState(
    () => Boolean(readStoredRefresh()),
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const accessTokenRef = useRef(null);
  const bootstrappedRef = useRef(false);

  if (accessTokenRef.current === null && accessToken) {
    accessTokenRef.current = accessToken;
  }

  useEffect(() => {
    accessTokenRef.current = accessToken;
    writeStoredAccess(accessToken);
  }, [accessToken]);

  useEffect(() => {
    writeStoredUser(user);
  }, [user]);

  const applyAuthPayload = useCallback((payload) => {
    if (!payload) return;
    if (payload.access_token) {
      accessTokenRef.current = payload.access_token;
      setAccessToken(payload.access_token);
    }
    if (payload.refresh_token) writeStoredRefresh(payload.refresh_token);
    if (payload.user) setUser(payload.user);
  }, []);

  const clearAuthState = useCallback(() => {
    accessTokenRef.current = null;
    setAccessToken(null);
    setUser(null);
    writeStoredRefresh(null);
    writeStoredAccess(null);
    writeStoredUser(null);
    resetRefreshState();
  }, []);

  const hydrateUserFromMe = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/auth/me", { _retry: true });
      const data = unwrap(res);
      if (data?.user) {
        setUser(data.user);
        return true;
      }
      if (
        data &&
        typeof data === "object" &&
        (data.email || data.phone_number || data.id)
      ) {
        setUser(data);
        return true;
      }
      console.warn("[auth] /auth/me returned unexpected payload:", res?.data);
      return false;
    } catch (err) {
      console.warn("[auth] /auth/me failed:", err?.message ?? err);
      return false;
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = readStoredRefresh();
    if (!refreshToken) throw new Error("No refresh token");
    const res = await axiosInstance.post(
      "/auth/refresh",
      { refresh_token: refreshToken },
      { _skipAuth: true, _retry: true },
    );
    const data = unwrap(res);
    if (!data?.access_token) throw new Error("Refresh returned no access token");
    applyAuthPayload(data);
    if (!data?.user) await hydrateUserFromMe();
    return data.access_token;
  }, [applyAuthPayload, hydrateUserFromMe]);

  useEffect(() => {
    setAuthHandles(
      () => accessTokenRef.current,
      () => refreshAccessToken(),
    );
  }, [refreshAccessToken]);

  useEffect(() => {
    if (bootstrappedRef.current) return;
    bootstrappedRef.current = true;
    const stored = readStoredRefresh();
    if (!stored) {
      setIsBootstrapping(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await refreshAccessToken();
      } catch {
        if (!cancelled) clearAuthState();
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshAccessToken, clearAuthState]);

  const login = useCallback(
    async ({ identifier, password }) => {
      const credentials = buildLoginCredentials(identifier, password);
      try {
        const res = await axiosInstance.post("/auth/login", credentials, {
          _skipAuth: true,
        });
        const data = unwrap(res);
        applyAuthPayload(data);
        if (data?.access_token && !data?.user) {
          const hydrated = await hydrateUserFromMe();
          if (!hydrated) {
            showToast(
              "Signed in, but couldn't load your profile. Please refresh.",
              { variant: "warning" },
            );
          }
        }
        return { ok: true, user: data?.user ?? null };
      } catch (err) {
        const message = extractApiError(err, "Sign in failed. Please try again.");
        return { ok: false, error: message };
      }
    },
    [applyAuthPayload, hydrateUserFromMe, showToast],
  );

  const register = useCallback(
    async ({ full_name, phone_number, email, password }) => {
      const body = { full_name, phone_number, password };
      if (email) body.email = email;
      try {
        const res = await axiosInstance.post("/auth/register", body, {
          _skipAuth: true,
        });
        const data = unwrap(res);
        const autoLoggedIn = Boolean(data?.access_token);
        if (autoLoggedIn) {
          applyAuthPayload(data);
          if (!data?.user) {
            const hydrated = await hydrateUserFromMe();
            if (!hydrated) {
              showToast(
                "Account created, but couldn't load your profile. Please refresh.",
                { variant: "warning" },
              );
            }
          }
        }
        return { ok: true, autoLoggedIn, user: data?.user ?? null };
      } catch (err) {
        const message = extractApiError(err, "Registration failed. Please try again.");
        return { ok: false, error: message };
      }
    },
    [applyAuthPayload, hydrateUserFromMe, showToast],
  );

  const logout = useCallback(async () => {
    try {
      if (accessTokenRef.current) {
        await axiosInstance.post("/auth/logout", {}, { _retry: true });
      }
    } catch {
      /* best-effort; ignore network errors on logout */
    }
    clearAuthState();
    navigate("/", { replace: false });
  }, [clearAuthState, navigate]);

  const requireAuth = useCallback(
    (actionFn, opts = {}) => {
      if (accessTokenRef.current && user) {
        actionFn?.();
        return true;
      }
      showToast(opts.message ?? "Please sign in to continue.", { variant: "info" });
      const from = location.pathname + location.search;
      navigate("/signin", { state: { from, intent: opts.intent ?? "action" } });
      return false;
    },
    [user, navigate, location.pathname, location.search, showToast],
  );

  const updateProfile = useCallback(async (payload) => {
    try {
      const res = await axiosInstance.patch("/user/profile", payload);
      const data = unwrap(res);
      const nextUser = data?.user ?? (data && typeof data === "object" ? data : null);
      if (nextUser) setUser(nextUser);
      return { ok: true, user: nextUser };
    } catch (err) {
      return { ok: false, error: extractApiError(err, "Could not update profile.") };
    }
  }, []);

  const changePassword = useCallback(async ({ current_password, new_password }) => {
    try {
      await axiosInstance.patch("/user/password", { current_password, new_password });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: extractApiError(err, "Could not change password.") };
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken && user),
      isBootstrapping,
      login,
      register,
      logout,
      refreshAccessToken,
      requireAuth,
      updateProfile,
      changePassword,
    }),
    [
      user,
      accessToken,
      isBootstrapping,
      login,
      register,
      logout,
      refreshAccessToken,
      requireAuth,
      updateProfile,
      changePassword,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
