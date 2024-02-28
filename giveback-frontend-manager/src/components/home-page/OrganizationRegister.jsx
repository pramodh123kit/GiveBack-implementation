import React, { useState } from 'react';
import styles from '@/pages/Home/Home.module.css';
import close_icon from '@/assets/close_icon.svg';

const OrganizationRegister = ({ onClose }) => {
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [orgName, setOrgName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [registrationDoc, setRegistrationDoc] = useState('');
    const [permit, setPermit] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [forWho, setForWho] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmitFirstPage = (e) => {
        e.preventDefault();
        // Validate data if needed
        // If validation passes, proceed to the next page
        setShowSecondPage(true);
    };

    const handleSubmitSecondPage = (e) => {
        e.preventDefault();
        // Handle submission of the complete form
        console.log('Complete Form submitted:', {
            orgName,
            address,
            email,
            contactNumber,
            registrationDoc,
            permit,
            type,
            quantity,
            forWho,
            summary,
        });
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.popupCard}>
                <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />
                {!showSecondPage ? (
                    <>
                        <h1 className={styles.form_header}>Register Your <br /> Organization or Charity</h1>
                        <form onSubmit={handleSubmitFirstPage}>
                            <div className={styles.form_container}>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Name of the organization/charity </label>
                                    <input className={styles.form_box} type="text" />
                                </div>

                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Address</label>
                                    <input className={styles.form_box} type="text" />
                                </div>

                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Email</label>
                                    <input className={styles.form_box} type="text" />
                                </div>

                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Contact</label>
                                    <input className={styles.form_box} type="text" />
                                </div>

                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Registration document</label>
                                    <input className={styles.form_box} type="text" />
                                </div>

                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Permit required for donation</label>
                                    <input className={styles.form_box} type="text" />
                                </div>
                            </div>
                            <div className={styles.form_btn}>
                                <input className={styles.next_btn} type="submit" value="Next" />
                            </div>
                        </form>
                    </>
                ) : (
                        <>
                            <h1 className={styles.form_header}>Register Your <br /> Organization or Charity</h1>
                            <form onSubmit={handleSubmitSecondPage}>
                                <div className={styles.form_container}>
                                    <div className={styles.forms}>
                                        <label className={styles.form_labels}>Type of donations needed <br /> (food, clothing, books, household items school items, furniture)</label>
                                        <input className={styles.form_box_big} type="text" />
                                    </div>

                                    <div className={styles.forms}>
                                        <label className={styles.form_labels}>Quantity</label>
                                        <input className={styles.form_box} type="text" />
                                    </div>

                                    <div className={styles.forms}>
                                        <label className={styles.form_labels}>Who will benefit from these donations?</label>
                                        <input className={styles.form_box} type="text" />
                                    </div>

                                    <div className={styles.forms}>
                                        <label className={styles.form_labels}>A brief summary of what the cause of this act</label>
                                        <input className={styles.form_box_big} type="text" />
                                    </div>
                                </div>
                                <div className={styles.form_btn}>
                                    <input className={styles.register_btn} type="submit" value="Register" />
                                </div>
                            </form>
                        </>
                    )}
            </div>
        </div>
    );
};

export default OrganizationRegister;