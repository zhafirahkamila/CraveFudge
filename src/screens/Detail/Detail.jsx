import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/detail.css";
import "../../styles/bestSellers.css";
import { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useFetchProduct from "../../hooks/useFetchProduct";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { formatIDR } from "../../lib/formatCurrency";

const parsePrices = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const AllGallery = () => {
  const { slug } = useParams();
  const { products, isLoading } = useFetchProduct();
  const item = products.find((product) => product.slug === slug);
  const [selesctedImg, setSelectedImg] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const videoRef = useRef([]);
  const itemRefs = useRef([]);
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const { requireAuth } = useAuth();

  const handleMouseEnter = (index) => {
    const video = videoRef.current[index];
    if (video) {
      video.currentTime = 0;
      video.play();
      video.style.display = "block";
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRef.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImg(0);
    setSizeIdx(0);
    setQty(1);
  }, [slug]);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) return <p>Loading...</p>;
  if (!item) return <div>Product not found</div>;

  const prices = parsePrices(item.prices);
  const safeSizeIdx = Math.min(sizeIdx, Math.max(0, prices.length - 1));
  const selectedSize = prices[safeSizeIdx];

  const galleryImg = [
    item.img,
    item.thumbnail1,
    item.thumbnail2,
    item.thumbnail3,
  ].filter(Boolean);

  const prevSlide = () => {
    setSelectedImg((prev) => (prev === 0 ? galleryImg.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSelectedImg((prev) => (prev === galleryImg.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    requireAuth(
      () => {
        addItem({
          id: item.id,
          slug: item.slug,
          title: item.title,
          img: item.img,
          size: selectedSize.size,
          price: Number(selectedSize.price),
          qty,
        });
        openCart();
      },
      { intent: "add_to_cart", message: "Please sign in to add items to your cart." },
    );
  };

  return (
    <>
      <Navbar />
      <div className="brownie-detail-container">
        <div className="brownie-left-column">
          {galleryImg.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              onClick={() => setSelectedImg(idx)}
              className={`thumb ${idx === selesctedImg ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="brownie-right-column">
          <div className="main-image-wrapper">
            <button type="button" onClick={prevSlide} className="nav-btn left">
              <i className="fas fa-chevron-left"></i>
            </button>
            <img
              src={galleryImg[selesctedImg]}
              alt="Selected"
              className="main-image"
            />
            <button type="button" onClick={nextSlide} className="nav-btn right">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="detail-content">
          <h2>{item.title}</h2>
          <p className="desc">{item.descDetail}</p>

          {prices.length > 0 ? (
            <>
              <div className="size-selector" role="radiogroup" aria-label="Select a size">
                <span className="size-selector-label">Size</span>
                <div className="size-chip-group">
                  {prices.map((entry, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="radio"
                      aria-checked={idx === safeSizeIdx}
                      className={`size-chip ${idx === safeSizeIdx ? "active" : ""}`}
                      onClick={() => setSizeIdx(idx)}
                    >
                      <span className="size-chip-size">{entry.size}</span>
                      <span className="size-chip-price">{formatIDR(entry.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="qty-row">
                <span className="qty-row-label">Quantity</span>
                <div className="qty-stepper" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="qty-stepper-value">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <FaShoppingCart aria-hidden="true" />
                <span>
                  Add to Cart · {formatIDR((selectedSize?.price ?? 0) * qty)}
                </span>
              </button>
            </>
          ) : (
            <p className="desc">Pricing unavailable for this product.</p>
          )}
        </div>
      </div>

      <div className="container-also-like">
        <div className="our-best-seller">
          <h1>You may also like</h1>
          <div className="best-seller">
            {products
              .filter((p) => p.slug !== slug)
              .filter((p) => p.slug)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((item, index) => (
                <div
                  className="best-seller-item"
                  key={index}
                  onClick={() => navigate(`/product/${item.slug}`)}
                  ref={(el) => (itemRefs.current[index] = el)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="media-wrapper"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <img src={item.img} alt={item.title} />
                    <video
                      ref={(el) => (videoRef.current[index] = el)}
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{ display: "none" }}
                    />
                    {item.type && (
                      <div className="svg-badge">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="badge-svg"
                          width="981"
                          height="479"
                          viewBox="0 0 981 479"
                          fill="none"
                        >
                          <path
                            d="M 7.71465 358.314 C 95.7118 578.371 941.269 464.831 977.05 260.575 C 1033.44 -61.3175 264.097 -32.0546 154.442 73.2922 C 150.38 77.1939 151.045 84.4012 154.442 82.8514 C 451.603 -52.7337 992.854 32.9095 947.002 260.575 C 894.125 434.007 27.8116 558.082 24.2994 319.296 C 21.9869 162.074 409.848 13.9859 690.425 61.1967 C 698.815 59.2458 692.21 50.7152 683.01 48.9061 C 382.142 -1.47829 -58.694 148.36 7.71465 358.314 Z"
                            stroke="#A60E13"
                            strokeWidth="8"
                            fill="none"
                          />
                        </svg>
                        <p className="best-seller-text">{item.type}</p>
                      </div>
                    )}
                  </div>
                  <h3>{item.title}</h3>
                  <p className="desc">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllGallery;
