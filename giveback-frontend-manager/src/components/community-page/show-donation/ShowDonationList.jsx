import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowDonationList.module.css';

const ShowDonationList = ({ filter, closestMatch, recipientFormSubmitted }) => {
  const [donations, setDonations] = useState([]);
  const [showDonations, setShowDonations] = useState(false);

  useEffect(() => {
    const handleShowDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getDonations');
        setDonations(response.data);
        setShowDonations(true);
      } catch (error) {
        console.error('Error fetching donations:', error.message);
        setDonations([]);
        setShowDonations(false);
      }
    };

    handleShowDonations();
  }, []);

  // Prepare filtered donations
  let filteredDonations = [...donations];

  // Filter by item type if filter is applied
  if (filter) {
    filteredDonations = donations.filter((donation) => 
      donation.itemType.toLowerCase() === filter.toLowerCase()
    );
  }

  // If recipient form is submitted and closest match is available, remove it from regular donations
  if (recipientFormSubmitted && closestMatch) {
    filteredDonations = filteredDonations.filter(donation => donation._id !== closestMatch._id);
  }

  return (
    <div className={styles['styles-donations-container']}>

      {recipientFormSubmitted && closestMatch && (
        <div className={styles['closest-donations-container']}>
          <h1 className={styles.form_header}>Closest Donation Item: </h1>
          <div className={styles['styles-donation-item']}>
            <div className={styles.form_container}>
              <div className={styles.forms}>Type of Donation: {closestMatch.itemType}</div>
              <div className={styles.forms}>Item Name: {closestMatch.itemName}</div>
              <div className={styles.forms}>Item Description: {closestMatch.itemDescription}</div>
              <div className={styles.forms}>Item Quantity: {closestMatch.itemQuantity}</div>
              <div className={styles.forms}>Donor Address: {closestMatch.donorAddress}</div>
              <div className={styles.forms}>Donator's Name: {closestMatch.donorName}</div>
              <div className={styles.forms}>Donator's Contact Number: {closestMatch.contactNumber}</div>
            </div>
            {closestMatch.image && (
              <div>
                <p className={styles.forms}>Image:</p>
                <img
                  className={styles['styles-donation-image']}
                  src={`http://localhost:5000/api/getImage/${closestMatch._id}`}
                  alt={`Closest Donation ${closestMatch._id}`}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <h1 className={styles.form_header}>Donation List: </h1>
      {filteredDonations.length === 0 && <h2>No items found</h2>}
      <ul>
        {filteredDonations.map((donation) => (
          <li key={donation._id} className={styles['styles-donation-item']}>
            <div className={styles.form_container}>
              <div className={styles.forms}>Type of Donation: {donation.itemType}</div>
              <div className={styles.forms}>Item Name: {donation.itemName}</div>
              <div className={styles.forms}>Item Description: {donation.itemDescription}</div>
              <div className={styles.forms}>Item Quantity: {donation.itemQuantity}</div>
              <div className={styles.forms}>Donor Address: {donation.donorAddress}</div>
              <div className={styles.forms}>Donator's Name: {donation.donorName}</div>
              <div className={styles.forms}>Donator's Contact Number: {donation.contactNumber}</div>
            </div>
            {donation.image && (
              <div>
                <p className={styles.forms}>Image:</p>
                <img
                  className={styles['styles-donation-image']}
                  src={`http://localhost:5000/api/getImage/${donation._id}`}
                  alt={`Donation ${donation._id}`}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default ShowDonationList;
