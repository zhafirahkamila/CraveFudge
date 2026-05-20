import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/profile.css";

const EMPTY_DRAFT = { full_name: "", email: "", phone_number: "" };
const EMPTY_PASSWORD = { current_password: "", new_password: "", confirm_password: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\d{8,15}$/;

const buildDraftFromUser = (user) => ({
  full_name: user?.full_name ?? user?.name ?? "",
  email: user?.email ?? "",
  phone_number: user?.phone_number ?? "",
});

const getInitials = (user) => {
  const source = user?.full_name || user?.name || user?.email || user?.phone_number || "";
  const trimmed = source.trim();
  if (!trimmed) return "C";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getDisplayName = (user) =>
  user?.full_name || user?.name || user?.email || user?.phone_number || "there";

const draftsEqual = (a, b) =>
  (a.full_name ?? "").trim() === (b.full_name ?? "").trim() &&
  (a.email ?? "").trim() === (b.email ?? "").trim() &&
  (a.phone_number ?? "").trim() === (b.phone_number ?? "").trim();

export default function Profile() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [infoMode, setInfoMode] = useState("view");
  const [infoDraft, setInfoDraft] = useState(EMPTY_DRAFT);
  const [infoError, setInfoError] = useState("");
  const [infoSubmitting, setInfoSubmitting] = useState(false);

  const [pwForm, setPwForm] = useState(EMPTY_PASSWORD);
  const [pwError, setPwError] = useState("");
  const [pwSubmitting, setPwSubmitting] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (infoMode === "view") {
      setInfoDraft(buildDraftFromUser(user));
    }
  }, [user, infoMode]);

  const initials = useMemo(() => getInitials(user), [user]);
  const displayName = useMemo(() => getDisplayName(user), [user]);

  if (!user) return null;

  const currentDraft = buildDraftFromUser(user);

  const handleEnterEdit = () => {
    setInfoDraft(buildDraftFromUser(user));
    setInfoError("");
    setInfoMode("edit");
  };

  const handleCancelEdit = () => {
    setInfoDraft(buildDraftFromUser(user));
    setInfoError("");
    setInfoMode("view");
  };

  const handleDraftChange = (field) => (event) => {
    const value = event.target.value;
    setInfoDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveInfo = async (event) => {
    event.preventDefault();
    if (infoSubmitting) return;

    const trimmed = {
      full_name: infoDraft.full_name.trim(),
      email: infoDraft.email.trim(),
      phone_number: infoDraft.phone_number.replace(/\s+/g, ""),
    };

    if (!trimmed.full_name) {
      setInfoError("Full name is required.");
      return;
    }
    if (trimmed.email && !EMAIL_PATTERN.test(trimmed.email)) {
      setInfoError("Please enter a valid email address.");
      return;
    }
    if (!PHONE_PATTERN.test(trimmed.phone_number)) {
      setInfoError("Phone number must be 8–15 digits.");
      return;
    }

    if (draftsEqual(trimmed, currentDraft)) {
      showToast("No changes to save.", { variant: "info" });
      setInfoMode("view");
      return;
    }

    setInfoError("");
    setInfoSubmitting(true);
    const payload = {
      full_name: trimmed.full_name,
      phone_number: trimmed.phone_number,
    };
    if (trimmed.email) payload.email = trimmed.email;
    else payload.email = null;

    const result = await updateProfile(payload);
    setInfoSubmitting(false);

    if (result.ok) {
      showToast("Profile updated.", { variant: "success" });
      setInfoMode("view");
    } else {
      setInfoError(result.error ?? "Could not update profile.");
    }
  };

  const handlePwChange = (field) => (event) => {
    const value = event.target.value;
    setPwForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (pwSubmitting) return;

    const { current_password, new_password, confirm_password } = pwForm;

    if (!current_password) {
      setPwError("Please enter your current password.");
      return;
    }
    if (new_password.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (new_password === current_password) {
      setPwError("New password must be different from the current one.");
      return;
    }
    if (new_password !== confirm_password) {
      setPwError("Passwords do not match.");
      return;
    }

    setPwError("");
    setPwSubmitting(true);
    const result = await changePassword({ current_password, new_password });
    setPwSubmitting(false);

    if (result.ok) {
      showToast("Password updated.", { variant: "success" });
      setPwForm(EMPTY_PASSWORD);
    } else {
      setPwError(result.error ?? "Could not change password.");
    }
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logout();
      showToast("Signed out.", { variant: "info" });
      navigate("/", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="Container">
      <Navbar />

      <main className="profile-main">
        <div className="profile-page-heading">
          <h1 className="profile-page-title">My account</h1>
          <p className="profile-page-subtitle">
            Manage your details, password, and saved addresses.
          </p>
        </div>

        <section className="profile-header" aria-labelledby="profile-greeting">
          <div className="profile-avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="profile-header-info">
            <span className="profile-header-status">Signed in</span>
            <h2 id="profile-greeting" className="profile-header-name">
              Hi, {displayName}
            </h2>
            <p className="profile-header-email">
              {user.email || user.phone_number || "Welcome back to CraveFudge."}
            </p>
          </div>
        </section>

        <div className="profile-grid">
          <section className="profile-card" aria-labelledby="profile-info-heading">
            <div className="profile-card-head">
              <div>
                <h2 id="profile-info-heading">Personal information</h2>
                <p className="profile-card-subtitle">
                  Used for receipts, deliveries, and account recovery.
                </p>
              </div>
              {infoMode === "view" && (
                <button
                  type="button"
                  className="profile-btn profile-btn-ghost"
                  onClick={handleEnterEdit}
                >
                  Edit
                </button>
              )}
            </div>

            {infoMode === "view" ? (
              <div className="profile-rows">
                <div className="profile-row">
                  <span className="profile-row-label">Full name</span>
                  <span
                    className={`profile-row-value ${currentDraft.full_name ? "" : "is-empty"}`}
                  >
                    {currentDraft.full_name || "Not set"}
                  </span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-label">Email</span>
                  <span
                    className={`profile-row-value ${currentDraft.email ? "" : "is-empty"}`}
                  >
                    {currentDraft.email || "Not set"}
                  </span>
                </div>
                <div className="profile-row">
                  <span className="profile-row-label">Phone</span>
                  <span
                    className={`profile-row-value ${currentDraft.phone_number ? "" : "is-empty"}`}
                  >
                    {currentDraft.phone_number || "Not set"}
                  </span>
                </div>
              </div>
            ) : (
              <form className="profile-form" onSubmit={handleSaveInfo} noValidate>
                <div className="input-box">
                  <label className="input-label" htmlFor="profile-full-name">
                    Full name
                  </label>
                  <input
                    id="profile-full-name"
                    type="text"
                    value={infoDraft.full_name}
                    onChange={handleDraftChange("full_name")}
                    autoComplete="name"
                    disabled={infoSubmitting}
                    required
                  />
                </div>
                <div className="input-box">
                  <label className="input-label" htmlFor="profile-email">
                    Email
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={infoDraft.email}
                    onChange={handleDraftChange("email")}
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={infoSubmitting}
                  />
                </div>
                <div className="input-box">
                  <label className="input-label" htmlFor="profile-phone">
                    Phone number
                  </label>
                  <input
                    id="profile-phone"
                    type="tel"
                    inputMode="numeric"
                    value={infoDraft.phone_number}
                    onChange={handleDraftChange("phone_number")}
                    autoComplete="tel"
                    placeholder="08123456789"
                    disabled={infoSubmitting}
                    required
                  />
                </div>

                {infoError && (
                  <div className="profile-form-error" role="alert">
                    {infoError}
                  </div>
                )}

                <div className="profile-actions">
                  <button
                    type="button"
                    className="profile-btn profile-btn-secondary"
                    onClick={handleCancelEdit}
                    disabled={infoSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="profile-btn profile-btn-primary"
                    disabled={infoSubmitting}
                  >
                    {infoSubmitting ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="profile-card" aria-labelledby="profile-password-heading">
            <div className="profile-card-head">
              <div>
                <h2 id="profile-password-heading">Change password</h2>
                <p className="profile-card-subtitle">
                  Use at least 6 characters. Choose something hard to guess.
                </p>
              </div>
            </div>

            <form className="profile-form" onSubmit={handleChangePassword} noValidate>
              <div className="input-box">
                <label className="input-label" htmlFor="profile-current-password">
                  Current password
                </label>
                <input
                  id="profile-current-password"
                  type="password"
                  value={pwForm.current_password}
                  onChange={handlePwChange("current_password")}
                  autoComplete="current-password"
                  disabled={pwSubmitting}
                  required
                />
              </div>
              <div className="input-box">
                <label className="input-label" htmlFor="profile-new-password">
                  New password
                </label>
                <input
                  id="profile-new-password"
                  type="password"
                  value={pwForm.new_password}
                  onChange={handlePwChange("new_password")}
                  autoComplete="new-password"
                  disabled={pwSubmitting}
                  required
                />
              </div>
              <div className="input-box">
                <label className="input-label" htmlFor="profile-confirm-password">
                  Confirm new password
                </label>
                <input
                  id="profile-confirm-password"
                  type="password"
                  value={pwForm.confirm_password}
                  onChange={handlePwChange("confirm_password")}
                  autoComplete="new-password"
                  disabled={pwSubmitting}
                  required
                />
              </div>

              {pwError && (
                <div className="profile-form-error" role="alert">
                  {pwError}
                </div>
              )}

              <div className="profile-actions">
                <button
                  type="submit"
                  className="profile-btn profile-btn-primary"
                  disabled={pwSubmitting}
                >
                  {pwSubmitting ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </section>

          <section
            className="profile-card profile-card-wide"
            aria-labelledby="profile-addresses-heading"
          >
            <div className="profile-card-head">
              <div>
                <h2 id="profile-addresses-heading">Saved addresses</h2>
                <p className="profile-card-subtitle">
                  Speed up checkout by saving your favorite delivery spots.
                </p>
              </div>
            </div>

            <div className="profile-empty">
              <div className="profile-empty-icon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <h3 className="profile-empty-title">No saved addresses yet</h3>
              <p className="profile-empty-text">
                Saving addresses is coming soon. You'll be able to manage delivery
                locations from this page.
              </p>
              <button
                type="button"
                className="profile-btn profile-btn-secondary"
                disabled
                aria-disabled="true"
                title="Coming soon"
              >
                <FaPlus aria-hidden="true" />
                Add address
              </button>
            </div>
          </section>
        </div>

        <div className="profile-footer">
          <button
            type="button"
            className="profile-btn profile-btn-danger"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Signing out…" : "Log out"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
