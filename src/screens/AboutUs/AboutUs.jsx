import React, { useEffect, useRef, useState } from "react";
import "../../styles/aboutUs.css";

const AboutUs = () => {

  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, []);
  

  return (
    <section className="about-us-section">
        <div ref={imgRef} className={`img-container ${isVisible ? "animate-in" : ""}`}>
          <img src="/images/Brownies.jpeg" alt="" />
        </div>
        <div className="text-container">
          <h2>CraveFudge ~ Dessert Based on Jakarta</h2>
          <p>
            CraveFudge is a homegrown brand that began as a small business on Instagram, 
            first known for our rich and fudgy brownies. Since then, 
            we’ve expanded our menu to include a variety of irresistible desserts — 
            and even a few savory options. Based in South Jakarta, CraveFudge was 
            founded in 2024 with one goal: to create comforting, crave-worthy bites for every moment.
          </p>
        </div>
    </section>
  );
};

export default AboutUs;
