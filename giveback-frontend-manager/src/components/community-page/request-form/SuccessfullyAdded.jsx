import React from 'react';
import styles from '@/pages/Home/Home.module.css';
import close_icon from '@/assets/close_icon.svg';

const SuccessPopup = ({ onClose }) => {
    return (
        <div className={styles.popupCard}>
            <h1 className={styles.donation_popup}>Successfully Added!</h1>
            <button className={styles.close_btn} onClick={onClose} > Close</button>
        </div>
    );
};

export default SuccessPopup;