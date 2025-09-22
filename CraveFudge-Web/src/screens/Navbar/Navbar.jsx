import "../../styles/main.css";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveMenu from "../../components/ResponsiveMenu";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/menu/")) {
      const category = location.pathname.split("/menu/")[1];
      setMenu(category);
    } else {
      setMenu("");
    }
  }, [location]);

  const handleClick = (category) => {
    setMenu(category);
    navigate(`/menu/${category}`);
  };

  return (
    <header className="navbar">
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <button className="btn">
          {open ? <FaTimes color="black" fontSize="25px" /> : <FaBars />}
        </button>
      </div>
      <img
        className="logo"
        src="/images/logoCrave.png"
        alt="Logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      <nav className="navbar-menu">
        <li
          onClick={() => handleClick("brownies")}
          className={menu === "brownies" ? "active" : ""}
        >
          Brownies
        </li>
        <li
          onClick={() => handleClick("cookies")}
          className={menu === "cookies" ? "active" : ""}
        >
          Cookies
        </li>
        <li
          onClick={() => handleClick("cakes")}
          className={menu === "cakes" ? "active" : ""}
        >
          Cakes
        </li>
        <li
          onClick={() => handleClick("savory")}
          className={menu === "savory" ? "active" : ""}
        >
          Savory
        </li>
      </nav>

      <div className="navbar-right">
        <button className="btn">
          <FaSearch />
        </button>

        <div className="navbar-cart">
          <button className="btn">
            <FaShoppingCart />
            <div className="dot"></div>
          </button>
        </div>

        <button className={`sign-btn ${open ? "hide" : ""}`} onClick={() => navigate("/signin")}>Sign in</button>
      </div>

      {/* <div className="hamburger" onClick={() => setOpen(!open)}>
        <button className="btn">
          {open ? <FaTimes color="black" fontSize="25px" /> : <FaBars />}
        </button>
      </div> */}

      <ResponsiveMenu
        open={open}
        setOpen={setOpen}
        menu={menu}
        handleClick={handleClick}
      />
    </header>
  );
};

export default Navbar;
