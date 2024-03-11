import React, { useState, useEffect } from "react";
import styles from './FindDonation.module.css';
import ShowDonationList from '../../components/community-page/show-donation/ShowDonationList';
import FilterSystem from "../../components/find-donation/Filter/Filter";
import RecipientForm from '@/components/community-page/request-form/RecipientForm';
import ClosestMatch from "@/components/community-page/closest-match/ClosestMatch";

const FindDonation = () => {

  const [closestMatch, setClosestMatch] = useState(null);
  const [showClosestMatch, setShowClosestMatch] = useState(false);
  const [recipientFormSubmitted, setRecipientFormSubmitted] = useState(false);

  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showDonationList, setShowDonationList] = useState(true);

  const handleOpenDonateForm = () => setShowDonateForm(true);
  const handleCloseDonateForm = () => setShowDonateForm(false);

  const handleOpenDonationList = () => setShowDonationList(true);
  const handleCloseDonationList = () => setShowDonationList(false);

  const handleOpenClosestMatch = () => setShowClosestMatch(true);
  const handleCloseClosestMatch = () => setShowClosestMatch(false);

  const [filter, setFilter] = useState('');

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className={styles.container}>
      <FilterSystem onFilter={handleFilterChange} />

      <button className="recieve-btn" onClick={handleOpenDonateForm}>
        Are you looking for donations?
      </button>
      {showDonateForm && <RecipientForm onClose={handleCloseDonateForm} setClosestMatch={setClosestMatch} onSubmit={() => setRecipientFormSubmitted(true)} />}
      {recipientFormSubmitted && (
        <>
          <button className="match-btn" onClick={handleOpenClosestMatch}>
            CLOSEST MATCH
          </button>
          {showClosestMatch && <ClosestMatch closestMatch={closestMatch} onClose={handleCloseClosestMatch} />}
        </>
      )}

      {showDonationList && <ShowDonationList filter={filter} />}
    </div>
  );
};

export default FindDonation;