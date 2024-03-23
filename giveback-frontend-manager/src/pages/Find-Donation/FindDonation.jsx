import React, { useState, useEffect } from "react";
import styles from './FindDonation.module.css';
import ShowDonationList from '../../components/community-page/show-donation/ShowDonationList';
import FilterSystem from "../../components/find-donation/Filter/Filter";
import RecipientForm from '@/components/community-page/request-form/RecipientForm';
import scroll from "@/assets/scroll.png";

const FindDonation = () => {
  const [closestMatch, setClosestMatch] = useState(null);
  const [recipientFormSubmitted, setRecipientFormSubmitted] = useState(false);
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [filter, setFilter] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleCloseRecipientForm = () => {
    setShowRecipientForm(false);
  };

  return (
    <div className={styles.container}>
     {isScrolled && 
        <img src={scroll} alt="" className={styles.scrollToTopButton} onClick={scrollToTop} />
      }
      <FilterSystem onFilter={handleFilterChange} />

      <button className="recieve-btn" onClick={() => setShowRecipientForm(true)}>
        Are you looking for donations?
      </button>
      {showRecipientForm && (
        <RecipientForm
          onClose={handleCloseRecipientForm}
          setClosestMatch={setClosestMatch}
          onSubmit={() => {
            setRecipientFormSubmitted(true);
            setShowRecipientForm(false); 
          }}
        />
      )}

      <ShowDonationList filter={filter} closestMatch={closestMatch} recipientFormSubmitted={recipientFormSubmitted} />
    </div>
  );
};

export default FindDonation;
