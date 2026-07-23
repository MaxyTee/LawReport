import React, { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Reports
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              News
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              About
            </NavLink>
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
          <NavLink to="/" className="mobile-nav-link" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink
            to="reports"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Reports
          </NavLink>
          <NavLink
            to="#analysis"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Analysis
          </NavLink>
          <NavLink
            to="#case-studies"
            className="mobile-nav-link"
            onClick={toggleMenu}
          >
            Case Studies
          </NavLink>
          <NavLink to="#news" className="mobile-nav-link" onClick={toggleMenu}>
            News
          </NavLink>
          <NavLink to="/" className="mobile-nav-link" onClick={toggleMenu}>
            About
          </NavLink>

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
