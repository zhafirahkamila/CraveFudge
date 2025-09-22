import React from "react";
import "../../styles/signin.css";
import "../../styles/password.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
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
            We will send you an email to reset your password
          </p>
          <form action="#" className="form">
            <div className="input-box">
              <input type="email" placeholder="Email" />
            </div>

            <button type="submit" className="signin-btn">
              Submit
            </button>

            <div className="create-account">
              <Link to="/signin">Cancel</Link>
            </div>
          </form>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ForgotPassword;
