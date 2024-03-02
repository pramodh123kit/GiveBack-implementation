import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/community-page/request-form/form.module.css';
import close_icon from '@/assets/close_iconn.svg';

const RecipientForm = ({ onClose }) => {
  const [itemType, setItemType] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API endpoint
      await axios.post('/api/recipientSubmitForm', {
        formType: 'recipient',
        itemType,
        itemName,
        itemDescription,
        itemQuantity,
        donorAddress,
        contactNumber,
        
        // Include other form fields
      });

      // Handle success or redirect to another page
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
                                <label className={styles.form_labels}>Type of Donation your looking for: <br/> (Food, Clothing, Books, Household items, School supplies, Furniture) </label>             
                                <input type="text" className={styles.form_box} value={itemType} onChange={(e) => setItemType(e.target.value)} required />
                            </div>

                            <div className={styles.forms}>
                                <label className={styles.form_labels}>Item Name: </label>             
                                <input type="text" className={styles.form_box} value={itemName} onChange={(e) => setItemName(e.target.value)} />
                            </div>

                            <div className={styles.forms}>
                                <label className={styles.form_labels}>Item description:</label>
                                <textarea type="text" value={itemDescription} className={styles.form_box} onChange={(e) => setItemDescription(e.target.value)} />
                            </div>

                            <div className={styles.forms}>
                                <label className={styles.form_labels}>Quantity</label>
                                <input type="text" className={styles.form_box} value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
                            </div>

                            <div className={styles.forms}>
                                <label className={styles.form_labels}>Your address:</label>
                                <input type="text" className={styles.form_box} value={donorAddress} onChange={(e) => setDonorAddress(e.target.value)} />
                            </div>

                            <div className={styles.forms}>
                                <label className={styles.form_labels}>Your contact number:</label>
                                <input type="text" className={styles.form_box} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.form_btn}>
                            <input className={styles.next_btn} type="submit" value="submit" />
                        </div>
                    </form>
                </>
            </div>
        </div>
    );
};

export default RecipientForm;
