import React, { useState, useEffect } from "react";
import logoLight from "@/assets/logoLight.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      if (!isTop) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`${menuOpen ? "open" : ""} ${scrolled ? "scrolled" : ""}`}>
      <div className="navContainer">
      <img src={logoLight} className="logo-light" alt="logo" />
      <div className="menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
        </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/charities">CHARITIES/ ORGANIZATIONS</NavLink>
        </li>
        <li>
          <NavLink to="/community">COMMUNITY</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="sign-in-button">SIGN UP</NavLink>
        </li>
      </ul>
      </div>
    </nav>
  );
};
