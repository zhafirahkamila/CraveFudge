import "../../styles/main.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsiveMenu from "../../components/ResponsiveMenu";
import useFetchProduct from "../../hooks/useFetchProduct";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { formatIDR } from "../../lib/formatCurrency";

const getDisplayName = (user) => {
  if (!user) return "";
  const raw = user.full_name || user.name || user.email || user.phone_number || "";
  return raw.trim().split(/\s+/)[0] || raw;
};

const getInitials = (user) => {
  if (!user) return "?";
  const source = user.full_name || user.name || user.email || user.phone_number || "?";
  const parts = String(source).trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "?";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
};

const parsePrices = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useFetchProduct();
  const { totalItems, openCart } = useCart();
  const { isAuthenticated, isBootstrapping, user, logout } = useAuth();

  useEffect(() => {
    if (location.pathname.startsWith("/menu/")) {
      const category = location.pathname.split("/menu/")[1];
      setMenu(category);
    } else {
      setMenu("");
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
  };

  const handleGoToProfile = () => {
    setUserMenuOpen(false);
    navigate("/profile");
  };

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        const title = (p.title ?? "").toLowerCase();
        const desc = (p.desc ?? "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      })
      .slice(0, 6);
  }, [searchQuery, products]);

  const handleClick = (category) => {
    setMenu(category);
    navigate(`/menu/${category}`);
  };

  const goToProduct = (slug) => {
    setSearchQuery("");
    setShowResults(false);
    navigate(`/product/${slug}`);
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
        <div className="navbar-search" ref={searchRef}>
          <FaSearch className="navbar-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search fudges, brownies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchQuery("");
                setShowResults(false);
                e.currentTarget.blur();
              }
            }}
            aria-label="Search products"
          />
          {showResults && searchQuery.trim() && (
            <ul className="navbar-search-results" role="listbox">
              {results.length === 0 ? (
                <li className="navbar-search-empty">No products match "{searchQuery.trim()}"</li>
              ) : (
                results.map((p) => {
                  const prices = parsePrices(p.prices);
                  const firstPrice = prices[0]?.price;
                  return (
                    <li
                      key={p.id}
                      role="option"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        goToProduct(p.slug);
                      }}
                    >
                      <img src={p.img} alt="" />
                      <div className="navbar-search-result-meta">
                        <span className="r-title">{p.title}</span>
                        {firstPrice != null && (
                          <span className="r-price">{formatIDR(firstPrice)}</span>
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>

        <div className="navbar-cart">
          <button className="btn" onClick={openCart} aria-label="Open cart">
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        {!isBootstrapping && isAuthenticated ? (
          <div
            className={`user-chip-wrap ${open ? "hide" : ""}`}
            ref={userMenuRef}
          >
            <button
              type="button"
              className="user-chip"
              onClick={() => setUserMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <span className="user-chip-avatar" aria-hidden="true">
                {getInitials(user)}
              </span>
              <span className="user-chip-name">{getDisplayName(user)}</span>
            </button>
            {userMenuOpen && (
              <div className="user-chip-menu" role="menu">
                <span className="user-chip-menu-label">Signed in</span>
                <button type="button" role="menuitem" onClick={handleGoToProfile}>
                  Profile
                </button>
                <button type="button" role="menuitem" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={`sign-btn ${open ? "hide" : ""}`}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        )}
      </div>

      <ResponsiveMenu
        open={open}
        setOpen={setOpen}
        menu={menu}
        handleClick={handleClick}
        isAuthenticated={!isBootstrapping && isAuthenticated}
        user={user}
        onSignInClick={() => {
          setOpen(false);
          navigate("/signin");
        }}
        onProfileClick={() => {
          setOpen(false);
          navigate("/profile");
        }}
        onLogoutClick={async () => {
          setOpen(false);
          await logout();
        }}
      />
    </header>
  );
};

export default Navbar;
