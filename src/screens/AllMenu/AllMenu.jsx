import React from "react";
import "../../styles/allMenu.css";
import ProductCard from "../../components/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { description } from "../../assets/assets";  
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useFetchProduct from "../../hooks/useFetchProduct";  

const categoryMap = {
  brownies: 1,
  cookies: 2,
  cakes: 3,
  savory: 4,
};

const AllMenu = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { products, isLoading } = useFetchProduct(); 

  const filteredProducts = products.filter(
    (product) => product.category_id === categoryMap[category]  
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="text">
        <h1>All {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <p>{description[category]}</p>
        <hr className="divider" />

        <div className="product-list">
          {filteredProducts.map((product, index) => {
            const prices = JSON.parse(product.prices);
            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${product.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  image={product.img}
                  title={product.title}
                  price={`Rp ${Number(prices[0].price).toLocaleString("id-ID")}`}
                  badges={[
                    { text: category, isType: false },
                    ...(product.type
                      ? [{ text: `🔥 ${product.type}`, isType: true }]
                      : []),
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllMenu;