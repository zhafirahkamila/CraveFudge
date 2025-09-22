import React from "react";
import "../../styles/allMenu.css";
import ProductCard from "../../components/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { description, products } from "../../assets/assets";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AllMenu = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  return (
    <>
      <Navbar />
      <div className="text">
        <h1>All {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <p>
          {description[category]}
        </p>
        <hr className="divider" />

        <div className="product-list">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => navigate(`/product/${product.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard
                key={index}
                image={product.img}
                title={product.title}
                price={`Rp ${product.prices[0].price.toLocaleString("id-ID")}`}
                badges={[
                  { text: product.category, isType: false },
                  ...(product.type
                    ? [{ text:`🔥 ${product.type}`, isType: true }]
                    : []),
                ]}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllMenu;
