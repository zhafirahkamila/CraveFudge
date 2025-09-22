import React from "react";
import "../../styles/footer.css";
import { useNavigate } from "react-router-dom";
import useFetchLink from "../../hooks/useFetchLink";
import useFetchCategory from "../../hooks/useFetchCategory";

const Footer = () => {
  const navigate = useNavigate();
  const { links } = useFetchLink();
  const { categories } = useFetchCategory();

  const handleClick = (menuName) => {
    navigate(`/menu/${menuName.toLowerCase()}`);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="/images/logoCrave.png"
          alt="CraveFudge Logo"
          className="footer-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <div className="socials">
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          {/* <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a> */}
        </div>

        <ul className="list-footer">
          {categories.map((category, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleClick(category.title)}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  padding: 0,
                  font: "inherit",
                }}
              >
                {category.title}
              </button>
            </li>
          ))}
        </ul>

        <p className="copyright">CraveFudge @ 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
