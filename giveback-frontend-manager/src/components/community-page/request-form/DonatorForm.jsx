import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/community-page/request-form/form.module.css';
import close_icon from '@/assets/close_iconn.svg';
import Cookies from 'universal-cookie';

const DonationFormForOrganization = ({ onClose, organizationEmail }) => {
  const [userName, setUserName] = useState('');
  const [userContactNumber, setUserContactNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [donationType, setDonationType] = useState('');
  const [donationQuantity, setDonationQuantity] = useState('');
  const [donationReason, setDonationReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const emailBody = `
        User Name: ${userName}
        Contact Number: ${userContactNumber}
        Email: ${userEmail}
        Donation Type: ${donationType}
        Donation Quantity: ${donationQuantity}
        Donation Reason: ${donationReason}
      `;

      await axios.post('https://project-giveback.azurewebsites.net/api/sendDonationEmail', { 
        userName,
        userContactNumber,
        userEmail,
        donationType,
        donationQuantity,
        donationReason,
        organizationEmail,
      });

      setSuccessMessage('Donation submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Error submitting donation. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.popupCard}>
        <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />
        <>
          <h1 className={styles.form_header}>Donating to Charities</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.form_container}>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Your Name:</label>
                <input type="text" className={styles.form_box} value={userName} onChange={(e) => setUserName(e.target.value)} required />
              </div>

              <div className={styles.forms}>
                <label className={styles.form_labels}>Your Contact Number:</label>
                <input type="text" className={styles.form_box} value={userContactNumber} onChange={(e) => setUserContactNumber(e.target.value)} required />
              </div>

              <div className={styles.forms}>
                <label className={styles.form_labels}>Your Email:</label>
                <input type="email" className={styles.form_box} value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
              </div>

              <div className={styles.forms}>
                <label className={styles.form_labels}>Donation Type:</label>
                <input type="text" className={styles.form_box} value={donationType} onChange={(e) => setDonationType(e.target.value)} required />
              </div>

              <div className={styles.forms}>
                <label className={styles.form_labels}>Donation Quantity:</label>
                <input type="text" className={styles.form_box} value={donationQuantity} onChange={(e) => setDonationQuantity(e.target.value)} required />
              </div>

              <div className={styles.forms}>
                <label className={styles.form_labels}>Why are you interested in donating to this charity:</label>
                <textarea className={styles.form_box} value={donationReason} onChange={(e) => setDonationReason(e.target.value)} required />
              </div>
            </div>
            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}
            <div className={styles.form_btn}>
              <input className={styles.next_btn} type="submit" value="Submit" />
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default DonationFormForOrganization;