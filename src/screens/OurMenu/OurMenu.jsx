import React from "react";
import "../../styles/ourMenu.css";
import { useNavigate } from "react-router-dom";
import useFetchCategory from "../../hooks/useFetchCategory";

const OurMenu = () => {
  const navigate = useNavigate();
  const { categories, isLoading } = useFetchCategory();

  const handleClick = (menuName) => {
    navigate(`/menu/${menuName.toLowerCase()}`);
  };

  return (
    <div className="our-menu-wrapper">
      <div className="our-menu" id="our-menu">
        <h1>Our Menu</h1>

        {isLoading ? (
          <p>Loading menus...</p> // bisa ganti spinner
        ) : (
          <div className="menu-list">
            {categories.map((category, idx) => (
              <div
                onClick={() => handleClick(category.title)}
                key={idx}
                className="menu-list-item"
              >
                <img src={category.image} alt={category.title} />
                <p>{category.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurMenu;
