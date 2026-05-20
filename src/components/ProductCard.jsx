import React from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/productCard.css";

const ProductCard = ({ image, title, price, badges, onAddToCart }) => {
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
        {onAddToCart && (
          <button
            type="button"
            className="quick-add-btn"
            aria-label={`Add ${title} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <FaPlus />
          </button>
        )}
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
