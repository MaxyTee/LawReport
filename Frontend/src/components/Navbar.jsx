import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <h2>BUKLawReport</h2>
          <span className="logo-subtitle">Legal Insights</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#reports" className="nav-link">
              Reports
            </a>
          </li>
          <li className="nav-item">
            <a href="#analysis" className="nav-link">
              Analysis
            </a>
          </li>
          <li className="nav-item">
            <a href="#case-studies" className="nav-link">
              Case Studies
            </a>
          </li>
          <li className="nav-item">
            <a href="#news" className="nav-link">
              News
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="login-btn">
            Login
          </Link>
          <Link to="/login" className="signup-btn">
            Subscribe
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
          <span
            className={`hamburger-line ${isMenuOpen ? "active" : ""}`}
          ></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          <a href="#home" className="mobile-nav-link" onClick={toggleMenu}>
            Home
          </a>
          <a href="#reports" className="mobile-nav-link" onClick={toggleMenu}>
            Reports
          </a>
          <a href="#analysis" className="mobile-nav-link" onClick={toggleMenu}>
            Analysis
          </a>
          <a
            href="#case-studies"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Case Studies
          </a>
          <a href="#news" className="mobile-nav-link" onClick={toggleMenu}>
            News
          </a>
          <a href="#about" className="mobile-nav-link" onClick={toggleMenu}>
            About
          </a>

          <div className="mobile-auth">
            <button className="mobile-login-btn">
              <Link to="/login" className="mobile-login-btn-link">
                Login
              </Link>
            </button>
            <button className="mobile-signup-btn">
              <Link to="" className="mobile-signup-btn-link">
                Subscribe
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
