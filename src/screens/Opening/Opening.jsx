import "../../styles/main.css";
import "../../styles/opening.css";

const Opening = () => {
  return (
    <>
      <div className="title-wrapper">
        <div className="angled-label">
          Dessert in J-Town
          <img className="cookie-img" src="/src/assets/cookie1.png" alt="" />
          <img className="cookie-img2" src="/src/assets/cookie2.png" alt="" />
        </div>
        <h1 className="title">
          The Ultimate Fudgy, Gooey, Rich, Melt-in-Your-Mouth Dessert Fix
        </h1>
        <h1 className="sub-title">
          Handcrafted with premium ingredients and endless love in South
          Jakarta. From fudgy brownies and gooey cookies to decadent layered
          desserts and timeless sweet treats — every bite is baked fresh and
          made to crave.
        </h1>
      </div>
    </>
  );
};

export default Opening;
