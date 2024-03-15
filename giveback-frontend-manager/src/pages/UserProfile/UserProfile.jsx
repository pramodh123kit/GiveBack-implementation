import React, { useState } from 'react';
import { StreamChat } from "stream-chat";
import { useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";
import styles from './UserProfile.module.css';
import logOutIcon from "@/assets/logout.png";

const cookies = new Cookies();

const apiKey = 'byfr7rs9s8mj';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
      donator: cookies.get('isDonator'),
      recipient: cookies.get('isRecipient'),
    }, authToken);
  }

  const fullName = cookies.get('fullName');
  const username = cookies.get('username');
  const email = cookies.get('avatarURL');
  const phoneNumber = cookies.get('phoneNumber');
  const userInitial = username ? username.charAt(0).toUpperCase() : '';

const UserProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(parseInt(queryParams.get('tab') || '0', 10));
 
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
    window.location.reload();
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabList}>
        <div className={styles.userIcon}>
            {userInitial}
        </div>
        <h2 className={styles.username}>{fullName}</h2>
          <button
            className={`${styles.tab} ${activeTab === 0 ? styles.active : ''}`}
            onClick={() => handleTabClick(0)}
          >
            Personal Information
          </button>
          <hr />
          <button
            className={`${styles.tab} ${activeTab === 1 ? styles.active : ''}`}
            onClick={() => handleTabClick(1)}
          >
            View Donation History
          </button>
          <hr />
          <button
            className={`${styles.tab} ${activeTab === 2 ? styles.active : ''}`}
            onClick={() => handleTabClick(2)}
          >
            View Feedback
          </button>
          <hr />
          <button
            className={`${styles.tab} ${activeTab === 3 ? styles.active : ''}`}
            onClick={() => handleTabClick(3)}
          >
            View Ratings
          </button>
          <hr />
          <div className={styles.logOut_container}>
            <div className={styles.center_container}></div>
                <div className={styles.logOut_button}>
                    <img
                    src={logOutIcon}
                    className={styles.image}
                    onClick={handleLogout}
                    />
                    <p className={styles.logOut_text} onClick={handleLogout}>Log Out</p>
                </div>
            <div className={styles.center_container}></div>
           </div>
        </div>
      </div>
      <div className={styles.content}>
        {activeTab === 0 && <PersonalInfo />}
        {activeTab === 1 && <DonationHistory />}
        {activeTab === 2 && <Feedback />}
        {activeTab === 3 && <Ratings />}
      </div>
    </div>
  );
};

const PersonalInfo = () => {
  return (
    <>
    <div className={styles.heading_container}>
      <h1>Personal Information</h1>
    </div>
        <div className={styles.contentItem}>
            <p><span className='text_heading_property'>Full Name:</span> {fullName}</p>
            <p><span className='text_heading_property'>Username:</span> {username}</p>
            <p><span className='text_heading_property'>Email:</span> {email}</p>
            <p><span className='text_heading_property'>Phone Number:</span> {phoneNumber}</p>
        </div>
    </>
  );
};

const DonationHistory = () => {
  return (
    <>
    <div className={styles.heading_container}>
      <h1>View Donation History</h1>
    </div>
        <div className={styles.contentItem}>
            <p>Username: {cookies.get('username')}</p>
            <p>Full Name: {cookies.get('fullName')}</p>
            <p>Email: {cookies.get('username')}</p>
            <p>Phone Number: {cookies.get('phoneNumber')}</p>
            <p>Donator: {cookies.get('isDonator')}</p>
            <p>Recipient: {cookies.get('isRecipient')}</p>
        </div>
    </>
  );
};

const Feedback = () => {
  return (
    <>
    <div className={styles.heading_container}>
      <h1>View Feedback History</h1>
    </div>
        <div className={styles.contentItem}>
            <h2>Username: {cookies.get('username')}</h2>
            <h2>Full Name: {cookies.get('fullName')}</h2>
            <h2>Email: {cookies.get('username')}</h2>
            <h2>Phone Number: {cookies.get('phoneNumber')}</h2>
            <h2>Donator: {cookies.get('isDonator')}</h2>
            <h2>Recipient: {cookies.get('isRecipient')}</h2>
        </div>
    </>
  );
};

const Ratings = () => {
  return (
    <>
    <div className={styles.heading_container}>
      <h1>View Ratings</h1>
    </div>
        <div className={styles.contentItem}>
            <h2>Username: {cookies.get('username')}</h2>
            <h2>Full Name: {cookies.get('fullName')}</h2>
            <h2>Email: {cookies.get('username')}</h2>
            <h2>Phone Number: {cookies.get('phoneNumber')}</h2>
            <h2>Donator: {cookies.get('isDonator')}</h2>
            <h2>Recipient: {cookies.get('isRecipient')}</h2>
        </div>
    </>
  );
};

export default UserProfile;