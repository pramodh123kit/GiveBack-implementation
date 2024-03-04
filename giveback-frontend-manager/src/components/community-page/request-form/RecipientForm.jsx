import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/community-page/request-form/form.module.css';
import close_icon from '@/assets/close_iconn.svg';

const RecipientForm = ({ onClose, setClosestMatch, onSubmit }) => {
  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientContactNumber, setRecipientContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/recipientSubmitForm', {
        formType: 'recipient',
        itemType,
        itemName,
        itemDescription,
        itemQuantity,
        recipientAddress,
        recipientContactNumber,
      });

      const { closestMatch } = response.data;

      if (closestMatch) {
        setClosestMatch(closestMatch);
      } else {
        console.log('No closest match found');
      }

      setSuccessMessage('Donation request submitted successfully!');
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.popupCard}>
        <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />
        <>
          <h1 className={styles.form_header}>Recipient's Form</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_container}>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Type of Donation you're looking for: <br/> (Food, Clothing, Books, Household items, School supplies, Furniture) </label>             
                <input type="text" className={styles.form_box} value={itemType} onChange={(e) => setItemType(e.target.value)} required />
              </div>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Item Name: </label>             
                <input type="text" className={styles.form_box} value={itemName} onChange={(e) => setItemName(e.target.value)} required />
              </div>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Item Description:</label>
                <input type="text" className={styles.form_box} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Quantity</label>
                <input type="text" className={styles.form_box} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
              </div>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Your Address:</label>
                <input type="text" className={styles.form_box} value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} required />
              </div>
              <div className={styles.forms}>
                <label className={styles.form_labels}>Your Contact Number:</label>
                <input type="text" className={styles.form_box} value={recipientContactNumber} onChange={(e) => setRecipientContactNumber(e.target.value)} required />
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

export default RecipientForm;