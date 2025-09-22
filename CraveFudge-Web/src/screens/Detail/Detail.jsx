import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../../assets/assets";
import "../../styles/detail.css";
import "../../styles/bestSellers.css";
import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";

const AllGallery = () => {
  const { slug } = useParams();
  const item = products.find((product) => product.slug === slug);
  const [selesctedImg, setSelectedImg] = useState(0);
  const videoRef = useRef([]);
  const itemRefs = useRef([]);
  const navigate = useNavigate();

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
    if (videoRef.current) {
      video.pause();
      video.currentTime = 0;
      video.style.display = "none";
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImg(0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!item) return <div>Product not found</div>;

  const galleryImg = [
    item.img,
    item.thumbnail1,
    item.thumbnail2,
    item.thumbnail3,
  ].filter(Boolean);

  const prevSlide = () => {
    setSelectedImg((prev) => (prev == 0 ? galleryImg.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setSelectedImg((prev) => (prev === galleryImg.length - 1 ? 0 : prev + 1));
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
          <div className="content-price">
            {item.prices.map((entry, idx) => (
              <div className="price-pair" key={idx}>
                <div className="container-price">
                  <span className="price-label">Size:</span>
                  <span className="price-value">{entry.size}</span>
                </div>
                <div className="container-price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(entry.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-also-like">
        <div className="our-best-seller">
          <h1>You may also like</h1>
          <div className="best-seller">
            {products
              .filter((p) => p.slug !== slug) // tidak tampilkan produk yang sedang dibuka
              .filter((p) => p.slug) // pastikan punya slug
              .sort(() => Math.random() - 0.5) // acak
              .slice(0, 3) // ambil 3
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
                    {item.slug && item.type && (
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
