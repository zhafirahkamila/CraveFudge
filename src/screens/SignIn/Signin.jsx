import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../../styles/signin.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Signin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");

    const trimmedId = identifier.trim();
    if (!trimmedId || !password) {
      setError("Please enter your email or phone and password.");
      return;
    }

    setSubmitting(true);
    const result = await login({ identifier: trimmedId, password });
    setSubmitting(false);

    if (result.ok) {
      showToast("Signed in successfully.", { variant: "success" });
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Sign in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="Container">
        <Navbar />
        <div className="login-main">
          <h1>Login</h1>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <label className="input-box">
              <span className="input-label">Email or Phone</span>
              <input
                type="text"
                placeholder="you@example.com or 08xxxxxxxxxx"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                disabled={submitting}
              />
            </label>
            <label className="input-box">
              <span className="input-label">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={submitting}
              />
            </label>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="signin-btn" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>

            <div className="create-account">
              <Link to="/signup" state={{ from }}>
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
