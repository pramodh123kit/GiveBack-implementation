import React, { useState } from 'react';
import styles from '@/pages/Home/Home.module.css';

const OrganizationRegister = ({ onClose }) => {
    const [orgName, setOrgName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [registrationDoc, setRegistrationDoc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here (e.g., send data to the server)
        console.log('Form submitted:', {
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
                <button className={styles.form_closeBtn} onClick={onClose}>Close</button>
                <h1 className={styles.form_header} >Register Your <br /> Organization or Charity</h1>
                <form onSubmit={handleSubmit}>

                    <div className={styles.form_container}>
                        <div className={styles.form_container1} >
                            <label className={styles.form_labels} >Name of the organization/charity</label>
                            <input className={styles.form_box} type="text" /> <br />

                            <label className={styles.form_labels} >Address</label> 
                            <input className={styles.form_box} type="text" /> <br />

                            <div className={styles.label_ec}>
                                <label className={styles.form_labels} >Email</label> 
                                <input className={styles.form_box} type="text" />
                                <label className={styles.form_labels} >Contact</label> 
                                <input className={styles.form_box} type="text" /> <br />
                            </div>

                            <label className={styles.form_labels} >Registration document</label> 
                            <input className={styles.form_box} type="text" /> <br />

                            <label className={styles.form_labels} >Permit required for donation</label> 
                            <input className={styles.form_box} type="text" /> <br />
                        </div>
                    </div>
                    <div className={styles.register_btn_label}>
                    <input className={styles.register_btn} type="submit" value="Register" />
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default OrganizationRegister;