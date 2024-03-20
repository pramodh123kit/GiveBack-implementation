import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/community-page/request-form/form.module.css';
import close_icon from '@/assets/close_iconn.svg';
import Cookies from 'universal-cookie';
import SuccessPopup from './SuccessfullyAdded';

const cookies = new Cookies();

const DonatorForm = ({ onClose }) => {
    const [showSubmit, setShowSubmit] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [itemType, setItemType] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [donorAddress, setDonorAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
  
    const userId = cookies.get('userId');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('formType', 'donator');
        formData.append('itemType', itemType);
        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        formData.append('itemQuantity', itemQuantity);
        formData.append('donorAddress', donorAddress);
        formData.append('contactNumber', contactNumber);
        formData.append('email', email);
        formData.append('donorName', cookies.get('fullName'));
        formData.append('donorId', userId);
  
        await axios.post('https://project-giveback.azurewebsites.net/api/donatorSubmitForm', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
  
        const donationLog = {
          itemType,
          itemName,
          itemDescription,
          itemQuantity,
          donorAddress,
          contactNumber,
          email,
          donorName: cookies.get('fullName'),
          donorId: userId,
        };
  
        // Retrieve existing donation history from localStorage
        const existingDonationHistory = JSON.parse(localStorage.getItem(`donationHistory_${userId}`)) || [];
        // Update the donation history with the new donation
        const updatedDonationHistory = [...existingDonationHistory, donationLog];
        // Save the updated donation history back to localStorage
        localStorage.setItem(`donationHistory_${userId}`, JSON.stringify(updatedDonationHistory));  
  

        setShowSubmit(false);
        setShowSuccessPopup(true);
        setSuccessMessage('Donation submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        setSuccessMessage('Error submitting donation. Please try again.');
      }
    };
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };
    
    return (
      <div className={styles.modalOverlay}>
            {showSuccessPopup ? ( 
                <SuccessPopup onClose={onClose} />
            ) : (
                <div className={styles.popupCard}>
          <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />
          <>
            <h1 className={styles.form_header}>Donator's Form</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.form_container}>
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Type of Donation: (Food, Clothing, Books, Household items, School supplies, Furniture) </label>             
                  <input type="text" className={styles.form_box} value={itemType} onChange={(e) => setItemType(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Item Name: </label>             
                  <input type="text" className={styles.form_box} value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Item description:</label>
                  <input value={itemDescription} className={styles.form_box} onChange={(e) => setItemDescription(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Quantity</label>
                  <input type="text" className={styles.form_box} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Your email:</label>
                  <input type="text" className={styles.form_box} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className={styles.forms}>
                  <label className={styles.form_labels}>Your address:</label>
                  <input type="text" className={styles.form_box} value={donorAddress} onChange={(e) => setDonorAddress(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Your contact number:</label>
                  <input type="text" className={styles.form_box} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                </div>
  
                <div className={styles.forms}>
                  <label className={styles.form_labels}>Donation Image:</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
              </div>
              {successMessage && (
                <div className={styles.successMessage}>{successMessage}</div>
              )}
              <div className={styles.form_btn}>
                <input className={styles.next_btn} type="submit" value="submit" />
                </div>
                        </form>
                    </>
                </div>
            )}
        </div>
    );
};
  
  export default DonatorForm;
