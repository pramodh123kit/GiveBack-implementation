import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowDonationList.module.css';
import close_icon from '@/assets/close_iconn.svg';

const ShowDonationList = ({ onClose }) => {
  const [donations, setDonations] = useState([]);
  const [showDonations, setShowDonations] = useState(false);

  const handleShowDonations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getDonations');
      setDonations(response.data);
      setShowDonations(true);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setDonations([]);
      setShowDonations(false);
    }
  };

  useEffect(() => {
    // Fetch donations when the component mounts
    handleShowDonations();
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.popupCard}>
        {showDonations ? (
          <>
            <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />
            <div className={styles['styles-donations-container']}>
               <h1 className={styles.form_header}>Donations: </h1>
              <ul>
                {donations.map((donation) => (
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
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ShowDonationList;
