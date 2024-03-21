import React, { useState, useEffect } from "react";
import styles from './Donation.module.css';
import SearchBar from '/src/components/donation_page/SearchBar/searchbar.jsx';
import Filter from '/src/components/donation_page/Filter/Filter.jsx'
import OrganizationView from '/src/components/donation_page/OrganizationView/OrganizationView.jsx';
import scroll from "@/assets/scroll.png";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

const cookies = new Cookies();

const apiKey = 'ehvtd7wtcmck';
const authToken = cookies.get('token');

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

const Donation = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  const isDonator = cookies.get('isDonator');
  const isRecipient = cookies.get('isRecipient');

  useEffect(() => {
    async function importStyles() {
      if (isDonator) {
        const module = await import('@/pages/Community/Community2.css');
      } else if (isRecipient) {
        const module = await import('@/pages/Community/Community.css');
      }
    }

    importStyles();
  }, [isDonator, isRecipient]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      setIsScrolled(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };


  return (
    <div className={styles.container}>
      {isScrolled && 
        <img src={scroll} alt="" className={styles.scrollToTopButton} onClick={scrollToTop} />
      }
      <OrganizationView/>      
    </div>
  )
}
export default Donation;
