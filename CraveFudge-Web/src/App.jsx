import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./screens/Navbar/Navbar"
import Opening from "./screens/Opening/Opening";
import "./index.css";
import OurMenu from "./screens/OurMenu/OurMenu";
import BestSeller from "./screens/BestSellers/BestSeller";
import AboutUs from "./screens/AboutUs/AboutUs";
import '@fortawesome/fontawesome-free/css/all.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import AllMenu from "./screens/AllMenu/AllMenu";
import AllGallery from "./screens/Detail/detail";
import Footer from "./screens/Footer/Footer";
import Signin from "./screens/SignIn/Signin";
import Signup from "./screens/SignUp/signup";
import ForgotPassword from "./screens/forgotPass/forgotPassword";

function HomePage() {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Navbar />
      <Opening />
      <OurMenu category={category} setCategory={setCategory} />
      <BestSeller />
      <AboutUs />
      <Footer />
    </>
  );
}

// function Menu() {
//   // const [category, setCategory] = useState("All");

//   return (
//     <>
//       <Navbar />
//       <AllMenu />
//       <Footer />
//     </>
//   );
// }


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<AllGallery />} />
        <Route path="/menu/:category" element={<AllMenu />} />
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
      </Routes>
    </Router>
  );
}

export default App;