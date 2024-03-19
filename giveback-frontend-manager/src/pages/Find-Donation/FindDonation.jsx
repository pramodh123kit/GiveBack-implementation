import React, { useState } from "react";
import styles from './FindDonation.module.css';
import ShowDonationList from '../../components/community-page/show-donation/ShowDonationList';
import FilterSystem from "../../components/find-donation/Filter/Filter";
import RecipientForm from '@/components/community-page/request-form/RecipientForm';

const FindDonation = () => {
  const [closestMatch, setClosestMatch] = useState(null);
  const [recipientFormSubmitted, setRecipientFormSubmitted] = useState(false);
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleCloseRecipientForm = () => {
    setShowRecipientForm(false);
  };

  return (
    <div className={styles.container}>
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
            setShowRecipientForm(false); // Hide the form when submitted
          }}
        />
      )}

      <ShowDonationList filter={filter} closestMatch={closestMatch} recipientFormSubmitted={recipientFormSubmitted} />
    </div>
  );
};

export default FindDonation;
