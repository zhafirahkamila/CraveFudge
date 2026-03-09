import React, { useEffect, useRef } from "react";
import "../../styles/bestSellers.css";
import { useNavigate } from "react-router-dom";
import useFetchBestSeller from "../../hooks/useFetchBestSeller";

const BestSeller = () => {
  const navigate = useNavigate();
  const { bestSellers, isLoading } = useFetchBestSeller();
  const videoRef = useRef([]);
  const itemRefs = useRef([]);

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
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]); 

  return (
    <div>
      <div className="our-best-seller">
        <h1>The Favorites</h1>

        {isLoading ? (
          <p>Loading Best Seller...</p>
        ) : (
          <div className="best-seller">
            {bestSellers.map((item, index) => (
              <div
                className="best-seller-item"
                key={item.id}
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
                </div>
                <h3>{item.title}</h3>
                <p className="desc">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
