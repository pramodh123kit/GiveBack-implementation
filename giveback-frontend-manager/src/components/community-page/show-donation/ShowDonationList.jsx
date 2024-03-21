import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import styles from './ShowDonationList.module.css';

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

const ShowDonationList = ({ filter, closestMatch, recipientFormSubmitted }) => {
  const [donations, setDonations] = useState([]);
  const [showDonations, setShowDonations] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackButtonLabel, setFeedbackButtonLabel] = useState('Give Feedback');
  const [userFeedback, setUserFeedback] = useState([]);

  useEffect(() => {
    const handleShowDonations = async () => {
      try {
        const response = await axios.get('https://project-giveback.azurewebsites.net/api/getDonations');
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

  const handleAcceptDonation = async (donationId) => {
    try {
      const recipientName = cookies.get('fullName'); 
      const recipientContactNumber = cookies.get('phoneNumber'); 
      const recipientEmail = cookies.get('avatarURL'); 
      
      await axios.post(`https://project-giveback.azurewebsites.net/api/acceptDonation/${donationId}`, { recipientName, recipientContactNumber, recipientEmail });
  
      // Update the donation status locally
      setDonations(prevDonations => prevDonations.map(donation => {
        if (donation._id === donationId) {
          return { ...donation, status: 'Accepted' };
        }
        return donation;
      }));
  
      console.log('Donation accepted successfully!');
    } catch (error) {
      console.error('Error accepting donation:', error.message);
    }
  };

  const handleGiveFeedback = async (donationId) => {
    try {
      const currentUser = client.user;
      if (!currentUser || !currentUser.id) {
        console.error('Current user not found or missing ID');
        return;
      }
  
      await axios.post(`https://project-giveback.azurewebsites.net/api/submitFeedback/${donationId}`, { feedbackText, userId: currentUser.id });
  
      console.log('Feedback submitted successfully!');
      setFeedbackText('');
      setShowFeedbackForm(false);
      setFeedbackButtonLabel('Give Feedback');

      await sendFeedbackToDonator(donationId, feedbackText);
    } catch (error) {
      console.error('Error giving feedback:', error.message);
    }
  };

  const sendFeedbackToDonator = async (donationId, feedbackText) => {
    try {

      const response = await axios.post(`https://project-giveback.azurewebsites.net/api/sendFeedbackToDonator/${donationId}`, {
        feedbackText: feedbackText,
      });

      if (response.status === 200) {
        console.log('Feedback sent to donator successfully!');
      } else {
        console.error('Failed to send feedback to donator');
      }
    } catch (error) {
      console.error('Error sending feedback to donator:', error.message);
    }
  };

  const toggleFeedbackForm = (donationId) => {
    if (selectedDonationId === donationId) {
      setSelectedDonationId(null);
    } else {
      setSelectedDonationId(donationId);
    }
  };

  let filteredDonations = [...donations];

  if (filter) {
    filteredDonations = donations.filter((donation) => 
      donation.itemType && donation.itemType.toLowerCase() === filter.toLowerCase()
    );
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
              <div className={styles.forms}>Donator's Name: {closestMatch.donorName}</div>
              <div className={styles.forms}>Donator's Email: {closestMatch.email}</div>
            </div>
             {closestMatch.image && (
              <div>
                <p className={styles.forms}>Image:</p>
                <img
                  className={styles['styles-donation-image']}
                  src={`https://project-giveback.azurewebsites.net/api/getImage/${closestMatch._id}`}
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
              <div className={styles.forms}>Donator's Name: {donation.donorName}</div>
              <div className={styles.forms}>Donator's Email: {donation.email}</div>
            </div>
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
            {donation.status === 'Accepted' ? (
              <>
                <span className={styles.accepted_text}>Accepted</span>
                <button
                  className={styles.feedback_button}
                  onClick={() => toggleFeedbackForm(donation._id)}
                >
                  {selectedDonationId === donation._id ? 'Close Feedback' : 'Give Feedback'}
                </button>
              </>
            ) : (
              <button
                className={styles.accept_btn}
                onClick={() => handleAcceptDonation(donation._id)}
                disabled={donation.status === 'Accepted'}
              >
                {donation.status === 'Accepted' ? 'Accepted' : 'Accept'}
              </button>
            )}
            {selectedDonationId === donation._id && (
              <div className={styles.feedback_form}>
                <textarea
                  className={styles.feedback_textarea}
                  placeholder="Enter your feedback here..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
                <button
                  className={styles.submit_feedback_button}
                  onClick={() => handleGiveFeedback(selectedDonationId)}
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowDonationList;
