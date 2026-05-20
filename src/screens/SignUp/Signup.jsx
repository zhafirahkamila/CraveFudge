import React, { useState } from "react";
import "../../styles/signin.css";
import Navbar from "../Navbar/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim().replace(/\s+/g, "");
    const email = form.email.trim();
    const password = form.password;

    if (!firstName || !lastName) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const full_name = `${firstName} ${lastName}`.trim();

    setSubmitting(true);
    const result = await register({
      full_name,
      phone_number: phone,
      email: email || undefined,
      password,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Registration failed. Please try again.");
      return;
    }

    if (result.autoLoggedIn) {
      showToast("Welcome to CraveFudge!", { variant: "success" });
      navigate(from, { replace: true });
    } else {
      showToast("Account created. Please sign in.", { variant: "success" });
      navigate("/signin", { replace: true, state: { from } });
    }
  };

  return (
    <>
      <div className="Container">
        <Navbar />
        <div className="login-main">
          <h1>Create Account</h1>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <label className="input-box">
              <span className="input-label">First Name</span>
              <input
                type="text"
                placeholder="Your first name"
                value={form.firstName}
                onChange={setField("firstName")}
                autoComplete="given-name"
                disabled={submitting}
              />
            </label>
            <label className="input-box">
              <span className="input-label">Last Name</span>
              <input
                type="text"
                placeholder="Your last name"
                value={form.lastName}
                onChange={setField("lastName")}
                autoComplete="family-name"
                disabled={submitting}
              />
            </label>
            <label className="input-box">
              <span className="input-label">Phone Number</span>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={form.phone}
                onChange={setField("phone")}
                autoComplete="tel"
                disabled={submitting}
              />
            </label>
            <label className="input-box">
              <span className="input-label">Email (optional)</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={setField("email")}
                autoComplete="email"
                disabled={submitting}
              />
            </label>
            <label className="input-box">
              <span className="input-label">Password</span>
              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={setField("password")}
                autoComplete="new-password"
                disabled={submitting}
              />
            </label>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="signin-btn" disabled={submitting}>
              {submitting ? "Creating..." : "Create"}
            </button>

            <div className="create-account">
              <Link to="/signin" state={{ from }}>
                Have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
