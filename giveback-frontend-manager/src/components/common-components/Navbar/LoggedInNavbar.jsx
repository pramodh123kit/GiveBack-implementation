import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import logoLight from "@/assets/logoLight.png";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import image from '@/assets/prof.svg'

const cookies = new Cookies();
const authToken = cookies.get('token');
const apiKey = 'byfr7rs9s8mj';
const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
    donator: cookies.get('isDonator'),
    recipient: cookies.get('isRecipient'),
  }, authToken);

  
}

export const LoggedInNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = cookies.get('username');
  const userInitial = username ? username.charAt(0).toUpperCase() : '';

  const isDonator = cookies.get('isDonator');
  const isRecipient = cookies.get('isRecipient');
  
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

   
    <nav className={menuOpen ? "open" : ""}>
      <img src={logoLight} className="logo-light" alt="logo" />
      <div className="menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {/* Donator Form */}
        {isDonator && (
      <>
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
      </>
    )}

    {/* Recipient Form */}
    {isRecipient && (
      <>
      <li>
          <NavLink to="/home">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/find-donation">FIND DONATION</NavLink>
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
      </>
    )}
    
      </ul>
    </nav>
  );
};
