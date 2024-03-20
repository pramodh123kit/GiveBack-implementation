import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/pages/Home/Home.module.css';
import close_icon from '@/assets/close_icon.svg';
import back_icon from '@/assets/back_icon.svg';
import Cookies from 'universal-cookie';

const OrganizationRegister = ({ onClose, onSubmit }) => {
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [orgName, setOrgName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [registrationDoc, setRegistrationDoc] = useState('');
    const [permit, setPermit] = useState('');
    const [image, setImage] = useState(null);
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [forWho, setForWho] = useState('');
    const [summary, setSummary] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const cookies = new Cookies();

    const handleSubmitFirstPage = async (e) => {
        e.preventDefault();
        setShowSecondPage(true);
    };

    const handleSubmitSecondPage = async (e) => {
        e.preventDefault();
        try {
          if (!orgName || !address || !email || !contactNumber || !registrationDoc || !permit || !type || !quantity || !forWho || !summary || !image) {
            alert('Please fill out all the required fields');
            return;
          }

          const formData = new FormData();
            formData.append('image', image);
            formData.append('orgName', orgName);
            formData.append('address', address);
            formData.append('email', email);
            formData.append('contactNumber', contactNumber);
            formData.append('registrationDoc', registrationDoc);
            formData.append('permit', permit);
            formData.append('type', type);
            formData.append('quantity', quantity);
            formData.append('forWho', forWho);
            formData.append('summary', summary);
            formData.append('donorName', cookies.get('fullName'));
            formData.append('donorId', cookies.get('userId'));

            axios.post('https://project-giveback.azurewebsites.net/api/registerOrganization', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', 
                },
              });

            setSuccessMessage('Organization registered successfully!');
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
            <div className={styles.popupCard}>
                <div className={styles.icons_container}>
                    {showSecondPage && (
                        <img src={back_icon} alt="back" className={styles.back_icon} onClick={() => setShowSecondPage(false)} />
                    )}
                    <img src={close_icon} alt="close" className={styles.close_icon} onClick={onClose} />  
                </div>
                {!showSecondPage ? (
                    <>
                        <h1 className={styles.form_header}>Register Your <br /> Organization or Charity</h1>
                        <form onSubmit={handleSubmitFirstPage}>
                            <div className={styles.form_container}>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Name of the organization/charity </label>
                                    <input className={styles.form_box} type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Address</label>
                                    <input className={styles.form_box} type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Email</label>
                                    <input className={styles.form_box} type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Contact</label>
                                    <input className={styles.form_box} type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}  required/>
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Registration document</label>
                                    <input className={styles.form_box} type="text" value={registrationDoc} onChange={(e) => setRegistrationDoc(e.target.value)} required />
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Permit required for donation</label>
                                    <input className={styles.form_box} type="text" value={permit} onChange={(e) => setPermit(e.target.value)} required/>
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Upload the logo</label>
                                    <input className={styles.upload_btn} type="file" accept="image/*" onChange={handleImageChange} required/>
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
                                    <input className={styles.form_box_big} type="text" value={type} onChange={(e) => setType(e.target.value)}  required/>
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Quantity</label>
                                    <input className={styles.form_box} type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>Who will benefit from these donations?</label>
                                    <input className={styles.form_box} type="text" value={forWho} onChange={(e) => setForWho(e.target.value)} required/>
                                </div>
                                <div className={styles.forms}>
                                    <label className={styles.form_labels}>A brief summary of what the cause of this act</label>
                                    <input className={styles.form_box_big} type="text" value={summary} onChange={(e) => setSummary(e.target.value)} required />
                                </div>
                            </div>
                            {successMessage && (
                                <div className={styles.successMessage}>{successMessage}</div>
                            )}
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