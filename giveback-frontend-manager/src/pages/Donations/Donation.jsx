import React, { useState, useEffect } from "react";
import styles from './Donation.module.css';
import SearchBar from '/src/components/donation_page/SearchBar/searchbar.jsx';
import Filter from '/src/components/donation_page/Filter/Filter.jsx'
import OrganizationView from '/src/components/donation_page/OrganizationView/OrganizationView.jsx';
import scroll from "@/assets/scroll.png";

const Donation = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
  
      const bottomPosition = windowHeight + scrollPosition;
  
      const buffer = 10; 
  
      if (bottomPosition >= documentHeight - buffer) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
     {/* <SearchBar/> */}
       {/* <Filter/> */}
      <OrganizationView/>
      
      
    </div>
  )
}
export default Donation;
