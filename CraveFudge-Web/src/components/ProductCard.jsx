import React from "react";
import "../styles/productCard.css";

const ProductCard = ({ image, title, price, badges }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image} alt={title} className="product-img" />
        <div className="badge-container">
          {badges.map((badge, index) => (
            <span
              className={`badge ${badge.isType ? "badge-type" : ""}`}
              key={index}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
      <div className="product-info">
        <h3>{title}</h3>
        <div className="price">
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
