import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const unwrap = (response) => {
  const body = response?.data;
  if (!body || typeof body !== "object") return body ?? null;
  if ("payload" in body) {
    const payload = body.payload;
    if (payload && typeof payload === "object") {
      if (payload.datas != null) return payload.datas;
      return payload;
    }
    return null;
  }
  return body;
};

export const extractApiError = (err, fallback) => {
  const body = err?.response?.data;
  const payload = body?.payload;
  if (payload?.message) return payload.message;
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const first = payload.errors[0];
    if (typeof first === "string") return first;
    if (first?.msg) return first.msg;
    if (first?.message) return first.message;
  }
  if (typeof body === "string") return body;
  if (body?.message) return body.message;
  if (err?.message) return err.message;
  return fallback;
};

let getAccessToken = () => null;
let refreshHandler = null;
let refreshPromise = null;

export const setAuthHandles = (tokenGetter, refresher) => {
  getAccessToken = typeof tokenGetter === "function" ? tokenGetter : () => null;
  refreshHandler = typeof refresher === "function" ? refresher : null;
};

export const resetRefreshState = () => {
  refreshPromise = null;
};

axiosInstance.interceptors.request.use((config) => {
  if (config._skipAuth) return config;
  const token = getAccessToken?.();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    const status = error?.response?.status;

    if (
      status !== 401 ||
      !config ||
      config._retry ||
      config._skipAuth ||
      !refreshHandler
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = Promise.resolve(refreshHandler()).finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }

    const newToken = getAccessToken?.();
    if (newToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${newToken}`;
    }
    return axiosInstance(config);
  },
);
