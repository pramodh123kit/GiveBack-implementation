import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DonationRequest.module.css';
import Cookies from 'universal-cookie';
import donationMissing from '@/assets/donation-missing.jpg';

import { ShowDonationList } from "@/components/community-page/index"
import DonatorForm from '@/components/community-page/request-form/DonatorForm';
import Popup from '@/components/DonationRequest/Popup/Popup';

const cookies = new Cookies();

const DonationRequest = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [showDonationList, setShowDonationList] = useState(false);

  const handleOpenDonateForm = () => setShowDonateForm(true);
  const handleCloseDonateForm = () => setShowDonateForm(false);

  const handleOpenDonationList = () => setShowDonationList(true);
  const handleCloseDonationList = () => setShowDonationList(false);

  const handleOpenClosestMatch = () => setShowClosestMatch(true);
  const handleCloseClosestMatch = () => setShowClosestMatch(false);

  const userId = cookies.get('userId');
  
  useEffect(() => {
    const fetchUserDonations = async () => {
      try {
        const response = await axios.get(`https://project-giveback.azurewebsites.net/api/getUserDonations?userId=${userId}`);
        setDonationHistory(response.data);
      } catch (error) {
        console.error('Error fetching user donations:', error);
      }
    };

    fetchUserDonations();
  }, [userId]);

  const handleDeleteItem = async (donationId) => {
    setSelectedDonationId(donationId);
    setShowPopup(true);
  };

  const confirmDeleteItem = async () => {
    try {
      await axios.delete(`https://project-giveback.azurewebsites.net/api/deleteDonation/${selectedDonationId}`);
      setDonationHistory(prevDonations => prevDonations.filter(donation => donation._id !== selectedDonationId));
      console.log('Donation deleted successfully!');
    } catch (error) {
      console.error('Error deleting donation:', error.message);
    } finally {
      setShowPopup(false);
    }
  };

  const cancelDeleteItem = () => {
    setSelectedDonationId(null);
    setShowPopup(false);
  };

  return (
    <div className={styles.container}>

      <div className={styles.donationList}>
        {donationHistory.length === 0 ? (
          <div className={styles.noItems_container}>
            <img src={donationMissing} className={styles.donation_missing_image} />
            <p className={styles.noItems}>You haven't donated any items yet.</p>
            <button className={styles.donate_btn} onClick={handleOpenDonateForm}>
              Would you like to donate?
            </button>
            {showDonateForm && <DonatorForm onClose={handleCloseDonateForm} />}
            {showDonationList && <ShowDonationList onClose={handleCloseDonationList} />}
          </div>
        ) : (
            
          <ul className={styles.list}>
          <button className={styles.donate2_btn} onClick={handleOpenDonateForm}>
              DONATE
            </button>
            {showDonateForm && <DonatorForm onClose={handleCloseDonateForm} />}
            {showDonationList && <ShowDonationList onClose={handleCloseDonationList} />}
          <h1 className={styles.header}>Your Donating Items</h1>
            {donationHistory.map((donation, index) => (
              <li key={index} className={styles.item}>
                <div className={styles.itemDetail}>
                  <p><span className={styles.label}>Item Type:</span> {donation.itemType}</p>
                  <p><span className={styles.label}>Item Name:</span> {donation.itemName}</p>
                  <p><span className={styles.label}>Item Description:</span> {donation.itemDescription}</p>
                  <p><span className={styles.label}>Item Quantity:</span> {donation.itemQuantity}</p>
                  <p><span className={styles.label}>Email:</span> {donation.email}</p>
                  {donation.image && (
                    <div>
                      <p className={styles.forms}>Image:</p>
                      <img
                        className={styles['styles-donation-image']}
                        src={`https://project-giveback.azurewebsites.net/api/getImage/${donation._id}`}
                        alt={`Donation ${donation._id}`}
                      />
                    </div>
                  )}
                  <button className={styles.delete_btn} onClick={() => handleDeleteItem(donation._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showPopup && (
        <Popup 
          message="Are you sure you want to delete this item?"
          onConfirm={confirmDeleteItem}
          onCancel={cancelDeleteItem}
        />
      )}
    </div>
  );
};

export default DonationRequest;
