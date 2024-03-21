import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StreamChat } from "stream-chat";
import styles from './DonationRequest.module.css';
import Cookies from 'universal-cookie';

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


const DonationRequest = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const userId = cookies.get('userId');

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
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://project-giveback.azurewebsites.net/api/deleteDonation/${donationId}`);
        // Filter out the deleted item from the donationHistory
        setDonationHistory(prevDonations => prevDonations.filter(donation => donation._id !== donationId));
        console.log('Donation deleted successfully!');
      } catch (error) {
        console.error('Error deleting donation:', error.message);
      }
    }
  };



  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Donating Items</h1>
      <div className={styles.donationList}>
        {donationHistory.length === 0 ? (
          <p className={styles.noItems}>You haven't donated any items yet.</p>
        ) : (
          <ul className={styles.list}>
            {donationHistory.map((donation, index) => (
              <li key={index} className={styles.item}>
                <div className={styles.itemDetail}>
                  <p><span className={styles.label}>Item Type:</span> {donation.itemType}</p>
                  <p><span className={styles.label}>Item Name:</span> {donation.itemName}</p>
                  <p><span className={styles.label}>Item Description:</span> {donation.itemDescription}</p>
                  <p><span className={styles.label}>Item Quantity:</span> {donation.itemQuantity}</p>
                  <p><span className={styles.label}>Email:</span> {donation.email}</p>
                  <button onClick={() => handleDeleteItem(donation._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DonationRequest;
