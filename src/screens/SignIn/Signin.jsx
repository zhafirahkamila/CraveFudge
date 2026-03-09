import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../../styles/signin.css";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <div className="Container">
        <Navbar />
        <div className="login-main">
          <h1>Login</h1>
          <form action="#" className="form">
            <div className="input-box">
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Password" />
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="signin-btn">
              Sign in
            </button>

            <div className="create-account">
              <Link to="/signup">Create account</Link>
            </div>
          </form>
        </div>
         {/* <Footer /> */}
      </div>
    </>
  );
};

export default Signin;
