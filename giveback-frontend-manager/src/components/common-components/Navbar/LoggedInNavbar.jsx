import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import logoLight from "@/assets/logoLight.png";
import image from '@/assets/prof.svg';
import UserDropDown from '@/components/user-profile/UserDropDown/UserDropDown';
import "./Navbar.css";

const cookies = new Cookies();

export const LoggedInNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = cookies.get('username');
  const userInitial = username && typeof username === 'string' ? username.charAt(0).toUpperCase() : '';

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

  const handleLogout = () => {
    // Removing user data from cookies
    cookies.remove('token');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('userId');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');
    cookies.remove('isDonator');
    cookies.remove('isRecipient');
    // Reloading the page after removing the user information
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  // Redirectin to the function to handle navigation
  const redirectToUserProfile = (index) => {
    switch (index) {
      case 0:
        window.location.href = '/user-profile';
        break;
      case 1:
        window.location.href = '/user-profile?tab=1';
        break;
      case 2:
        window.location.href = '/user-profile?tab=2';
        break;
      case 3:
        window.location.href = '/user-profile?tab=3';
        break;
      default:
        break;
    }
  };

  // Checking if the user is authenticated
  const isAuthenticated = cookies.get('token');

  // Checking if the user is a donator
  const isDonator = cookies.get('isDonator');

  // Checking if the user is a recipient
  const isRecipient = cookies.get('isRecipient');

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
        {isAuthenticated && (isDonator || isRecipient) && (
          <>
            <li><NavLink to="/home">HOME</NavLink></li>
            {isDonator && 
              <li>
                <NavLink to="/donations">DONATION</NavLink>
              </li>}
              <li>
                <NavLink to="/donation-request">DONATING ITEMS</NavLink>
              </li>
            {isRecipient && <li><NavLink to="/find-donation">FIND DONATION</NavLink></li>}
            <li><NavLink to="/community">COMMUNITY</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li><NavLink to="/contact">CONTACT</NavLink></li>
            <li>
              <div className="user-initial-icon" onClick={toggleDropdown}>
                {userInitial}
              </div>
              {dropdownOpen && <UserDropDown onClose={handleClose} redirectToUserProfile={redirectToUserProfile} />}
            </li>
          </>
        )}
      </ul>
      </div>
    </nav>
  );
};
