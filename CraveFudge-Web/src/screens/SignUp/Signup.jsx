import React from 'react'
import "../../styles/signin.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
      <div className="Container">
        <Navbar />
        <div className="login-main">
          <h1>Create Account</h1>
          <form action="#" className="form">
            <div className="input-box">
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-box">
              <input type="text" placeholder="Password" />
            </div>

            <button type="submit" className="signin-btn">
              Create
            </button>

            <div className="create-account">
              <Link to="/signin">Have an account?</Link>
            </div>
          </form>
        </div>
         {/* <Footer /> */}
      </div>
    </>
  )
}

export default Signup
