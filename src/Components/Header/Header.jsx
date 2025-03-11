import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; 
import SignUp from "../signup&sigin/SignUp";
import SignIn from "../signup&sigin/SignIn";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <header>
        <nav className="header1">
          <div className="logo">
            <img src="/HeaderAssests/logo.png" alt="CITY PULSE" />
            <h2>CityPulse</h2>
          </div>
          <div className={`navlinks ${menuOpen ? "open" : ""}`}>
            <ul>
              <li onClick={scrollToAbout}><Link to="/">Home</Link></li>
              <li onClick={scrollToAbout}><Link to="/about">About Us</Link></li>
              <li onClick={scrollToAbout}><Link to="/guide">Guide</Link></li>
              <li onClick={scrollToAbout}><Link to="/packages">Packages</Link></li>
              <li onClick={scrollToAbout}><Link to="/testimonials">Testimonials</Link></li>
              <li onClick={scrollToAbout}><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </nav>

      
    <div>
      <nav className="header2">
        <div className="links">
          <ul className="contactlinks">
            <li>📞 +91 8888888888</li>
            <li>✉️ CityPluse_Tour@gmail.com</li>
            <li>🕒 Mon - Fri: 9AM - 6PM</li>
          </ul>
          <div className="signupdetails">
            <button onClick={() => setShowModal("signup")}>Signup</button>
            <button onClick={() => setShowModal("signin")}>SignIn</button>
          </div>
        </div>
      </nav>

      {/* SignUp & SignIn Modals */}
      {showModal === "signup" && <SignUp closeModal={() => setShowModal(null)} />}
      {showModal === "signin" && <SignIn closeModal={() => setShowModal(null)} />}
    </div>
      </header>
    </>
  );
};

export default Header;
