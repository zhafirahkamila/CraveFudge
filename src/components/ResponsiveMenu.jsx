import React from "react";
import "../styles/main.css";
import { FaTimes } from "react-icons/fa";

const ResponsiveMenu = ({
  open,
  setOpen,
  menu,
  handleClick,
  isAuthenticated = false,
  user = null,
  onSignInClick,
  onProfileClick,
  onLogoutClick,
}) => {
  const displayName =
    user?.full_name || user?.name || user?.email || user?.phone_number || "";

  return (
    <div className={`responsive-menu ${open ? "show" : ""}`}>
      <button
        type="button"
        className="close-icon"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      >
        <FaTimes />
      </button>

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

      {isAuthenticated ? (
        <>
          {displayName && (
            <p className="responsive-user">Signed in as {displayName}</p>
          )}
          {onProfileClick && (
            <button
              type="button"
              className="sign-btn-responsive sign-btn-responsive-secondary"
              onClick={onProfileClick}
            >
              Profile
            </button>
          )}
          <button
            type="button"
            className="sign-btn-responsive"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          type="button"
          className="sign-btn-responsive"
          onClick={onSignInClick}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default ResponsiveMenu;
