import React from "react";
import "../styles/main.css";
import { FaTimes } from "react-icons/fa";

const ResponsiveMenu = ({ open, setOpen, menu, handleClick }) => {

  return (
    <div className={`responsive-menu ${open ? "show" : ""}`}>
      {/* <FaTimes className="close-icon" onClick={() => setOpen(false)} /> */}
      {/* <div className="responsive-header">
        <img
          src="/src/assets/logoCrave.png"
          alt="Logo"
          className="responsive-logo"
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
        />
        <FaTimes className="close-icon" onClick={() => setOpen(false)} />
      </div> */}

      <ul>
        <li
          onClick={() => {
            handleClick("brownies");
            setOpen(false);
          }}
          className={menu === "brownies" ? "active" : ""}
        >
          Brownies
        </li>
        <li
          onClick={() => {
            handleClick("cookies");
            setOpen(false);
          }}
          className={menu === "cookies" ? "active" : ""}
        >
          Cookies
        </li>
        <li
          onClick={() => {
            handleClick("cakes");
            setOpen(false);
          }}
          className={menu === "cakes" ? "active" : ""}
        >
          Cakes
        </li>
        <li
          onClick={() => {
            handleClick("savory");
            setOpen(false);
          }}
          className={menu === "savory" ? "active" : ""}
        >
          Savory
        </li>
      </ul>
      <button className="sign-btn-responsive">Sign in</button>
    </div>
  );
};

export default ResponsiveMenu;
