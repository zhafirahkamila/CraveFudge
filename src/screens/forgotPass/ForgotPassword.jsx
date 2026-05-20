import React from "react";
import "../../styles/signin.css";
import "../../styles/password.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="Container">
        <Navbar />
        <div className="password-main">
          <h1>
            Reset your

            password
          </h1>
          <p className="password-subtext">
            Self-serve password reset is coming soon. In the meantime, please
            contact support so we can help recover your account.
          </p>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label className="input-box">
              <span className="input-label">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                disabled
              />
            </label>

            <div className="password-notice" role="status">
              Coming soon — reach out at support@cravefudge.com for help.
            </div>

            <button type="submit" className="signin-btn" disabled>
              Submit
            </button>

            <div className="create-account">
              <Link to="/signin">Back to sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
