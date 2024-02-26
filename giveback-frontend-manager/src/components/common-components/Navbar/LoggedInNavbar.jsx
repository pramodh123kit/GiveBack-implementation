import React, { useState } from "react";
import logoLight from "@/assets/logoLight.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import image from '@/assets/prof.svg'

const cookies = new Cookies();

export const LoggedInNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = cookies.get('username');
  const userInitial = username ? username.charAt(0).toUpperCase() : '';
  
  const handleLogout = () => {
    cookies.remove('token');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('userId');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');
    cookies.remove('isDonator');
    cookies.remove('isRecipient');
    window.location.reload();
  };

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
          {/* <img src={image} className="prof-img" onClick={handleLogout}/> */}
          <div 
            className="user-initial-icon"
            onClick={handleLogout}
            >
            {userInitial}
          </div>
        </li>
      </ul>
    </nav>
  );
};
