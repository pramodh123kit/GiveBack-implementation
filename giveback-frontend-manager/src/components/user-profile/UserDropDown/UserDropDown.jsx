import React, { useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { StreamChat } from "stream-chat";
import styles from './UserDropDown.module.css';
import CloseIcon from '@/assets/close_iconn.svg';
import logOutIcon from "@/assets/logout.png";
import handHeartIcon from "@/assets/hand-heart.png";
import profileIconDropdown from "@/assets/profile-icon-dropdown.png";
import donationHistoryDropdown from "@/assets/donation-history-dropdown.png";
import feedbackDropdown from "@/assets/feedback-dropdown.png";
import startDropdown from "@/assets/star-dropdown.png";

const cookies = new Cookies();

const apiKey = 'ehvtd7wtcmck';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    email: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
    donator: cookies.get('isDonator'),
    recipient: cookies.get('isRecipient'),
  }, authToken);
}

const username = cookies.get('username');

const UserDropDown = ({ onClose, redirectToUserProfile }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleRedirect = (index) => {
      redirectToUserProfile(index);
      onClose(); 
    };

    const handleLogout = () => {
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');
        cookies.remove('isDonator');
        cookies.remove('isRecipient');

        window.location.href = '/home';
    }
  
    return (
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <div className={styles.dropdown}>
        <img src={CloseIcon} className={styles.closeButton} onClick={onClose} />

           <div className={styles.handout_container}>
                <div className={styles.hello_button}>
                    <p><span className={styles.handName_heading}>Hello, {username}</span></p>
                    <img
                    src={handHeartIcon}
                    className={styles.imageHand}
                    />
                </div>
           </div>

           <div className={styles.logOut_container}>
                <div className={styles.logOut_button}>
                    <img
                    src={profileIconDropdown}
                    className={styles.image}
                    onClick={() => handleRedirect(0)}
                    />
                    <p className={styles.logOut_text} onClick={() => handleRedirect(0)}>My Profile</p>
                </div>
           </div>

           <div className={styles.logOut_container}>
                <div className={styles.logOut_button}>
                    <img
                    src={donationHistoryDropdown}
                    className={styles.image}
                    onClick={() => handleRedirect(1)}
                    />
                    <p className={styles.logOut_text} onClick={() => handleRedirect(1)}>My Donation History</p>
                </div>
           </div>

           <div className={styles.logOut_container}>
                <div className={styles.logOut_button}>
                    <img
                    src={feedbackDropdown}
                    className={styles.image}
                    onClick={() => handleRedirect(2)}
                    />
                    <p className={styles.logOut_text} onClick={() => handleRedirect(2)}>My Feedback</p>
                </div>
           </div>


          <div className={styles.logOut_container}>
                <div className={styles.logOut_button}>
                    <img
                    src={logOutIcon}
                    className={styles.image}
                    onClick={handleLogout}
                    />
                    <p className={styles.logOut_text} onClick={handleLogout}>Log Out</p>
                </div>
           </div>
        </div>
      </div>
    );
  };
  
  export default UserDropDown;
