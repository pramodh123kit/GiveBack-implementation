import React, { useState } from "react";
import logoLight from "../../../Assets/logoLight.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <img src={logoLight} className="logo-light" alt="logo" />
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/donations">DONATION</NavLink>
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
    </nav>
  );
};
