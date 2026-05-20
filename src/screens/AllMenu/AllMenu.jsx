import React from "react";
import "../../styles/allMenu.css";
import ProductCard from "../../components/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import { description } from "../../assets/assets";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useFetchProduct from "../../hooks/useFetchProduct";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const categoryMap = {
  brownies: 1,
  cookies: 2,
  cakes: 3,
  savory: 4,
};

const parsePrices = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const AllMenu = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { products, isLoading } = useFetchProduct();
  const { addItem, openCart } = useCart();
  const { requireAuth } = useAuth();

  const filteredProducts = products.filter(
    (product) => product.category_id === categoryMap[category]
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <section className="menu-page">
        <div className="text">
          <div className="menu-breadcrumb">Home / {category}</div>
          <h1>All {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
          <p>{description[category]}</p>
          <hr className="divider" />
        </div>

        <div className="product-list">
          {filteredProducts.map((product, index) => {
            const prices = parsePrices(product.prices);
            const firstPrice = prices[0];
            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${product.slug}`)}
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  image={product.img}
                  title={product.title}
                  price={
                    firstPrice
                      ? `Rp ${Number(firstPrice.price).toLocaleString("id-ID")}`
                      : "—"
                  }
                  badges={[
                    { text: category, isType: false },
                    ...(product.type
                      ? [{ text: `🔥 ${product.type}`, isType: true }]
                      : []),
                  ]}
                  onAddToCart={
                    firstPrice
                      ? () =>
                          requireAuth(
                            () => {
                              addItem({
                                id: product.id,
                                slug: product.slug,
                                title: product.title,
                                img: product.img,
                                size: firstPrice.size,
                                price: Number(firstPrice.price),
                                qty: 1,
                              });
                              openCart();
                            },
                            {
                              intent: "add_to_cart",
                              message: "Please sign in to add items to your cart.",
                            },
                          )
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllMenu;
