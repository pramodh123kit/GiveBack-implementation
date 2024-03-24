import React, { useState, useEffect } from 'react';
import { StreamChat } from "stream-chat";
import { useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";
import axios from 'axios';
import styles from './UserProfile.module.css';
import logOutIcon from "@/assets/logout.png";

const cookies = new Cookies();

const apiKey = 'byfr7rs9s8mj';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    email: cookies.get('avatarURL'),
    contactNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
    donator: cookies.get('isDonator'),
    recipient: cookies.get('isRecipient'),
  }, authToken);
}

const UserProfile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(parseInt(queryParams.get('tab') || '0', 10));
  const userId = cookies.get('userId');
  const [donationHistory, setDonationHistory] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const isDonator = cookies.get('isDonator');
  const isRecipient = cookies.get('isRecipient');

  useEffect(() => {
    async function importStyles() {
      if (isDonator) {
        const module = await import('@/pages/Community/Community2.css');
      } else if (isRecipient) {
        const module = await import('@/pages/Community/Community.css');
      }
    }

    importStyles();
  }, [isDonator, isRecipient]);

  useEffect(() => {
    const fetchUserDonations = async () => {
      try {
        const response = await axios.get(`https://project-giveback.azurewebsites.net/api/getUserDonations?userId=${userId}`);
        setDonationHistory(response.data);
      } catch (error) {
        console.error('Error fetching user donations:', error);
      }
    };

    const fetchUserFeedback = async () => {
      try {
        const response = await axios.get(`https://project-giveback.azurewebsites.net/api/getFeedback?userId=${String(userId)}`);
        setFeedbackHistory(response.data);
      } catch (error) {
        console.error('Error fetching user feedback:', error);
      }
    };

    fetchUserDonations();
    fetchUserFeedback();
  }, [userId]);

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
    localStorage.removeItem(`donationHistory_${userId}`);
    window.location.reload();
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    if (isDonator) {
      const userIcon = document.querySelector(`.${styles.userIcon}`);
      userIcon.style.backgroundColor = '#71005e';
    }
  }, [isDonator]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div className={styles.tabList}>
          <div className={styles.userIcon}>
            {cookies.get('username') ? cookies.get('username').charAt(0).toUpperCase() : ''}
          </div>
          <h2 className={styles.username}>{cookies.get('fullName')}</h2>
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
          <div className={styles.logOut_container}>
            <div className={styles.center_container}></div>
            <div className={styles.logOut_button}>
              <img
                src={logOutIcon}
                className={styles.image}
                onClick={handleLogout}
                alt="Logout"
              />
              <p className={styles.logOut_text} onClick={handleLogout}>Log Out</p>
            </div>
            <div className={styles.center_container}></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {activeTab === 0 && <PersonalInfo />}
        {activeTab === 1 && <DonationHistory donationHistory={donationHistory} />}
        {activeTab === 2 && <Feedback feedbackHistory={feedbackHistory} />}
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
        <p><span className='text_heading_property'>Currently logged in as a:</span> {cookies.get('isDonator') ? 'Donator' : 'Recipient'}</p>
        <p><span className='text_heading_property'>Full Name:</span> {cookies.get('fullName')}</p>
        <p><span className='text_heading_property'>Username:</span> {cookies.get('username')}</p>
        <p><span className='text_heading_property'>User ID:</span> {cookies.get('userId')}</p>
      </div>
    </>
  );
};

const DonationHistory = ({ donationHistory }) => {
  return (
    <>
      <div className={styles.heading_container}>
        <h1>View Donation History</h1>
      </div>
      <div className={styles.contentItem}>
        {donationHistory.length === 0 ? (
          <p>No donations are found.</p>
        ) : (
          donationHistory.map((donation, index) => (
            <div key={index} className={styles.inside_content}>
              <p><span className='text_heading_property'>Donated Item Type:</span> {donation.itemType}</p>
              <p><span className='text_heading_property'>Donated Item Name:</span> {donation.itemName}</p>
              <p><span className='text_heading_property'>Donated Item Description:</span> {donation.itemDescription}</p>
              <p><span className='text_heading_property'>Donated Item Quantity:</span> {donation.itemQuantity}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
};

const Feedback = ({ feedbackHistory }) => {
  return (
    <>
      <div className={styles.heading_container}>
        <h1>View Feedback History</h1>
      </div>
      <div className={styles.contentItem}>
        {feedbackHistory.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          feedbackHistory.map((feedback, index) => (
            <div key={index} className={styles.inside_content}>
              <p><span className='text_heading_property'>Feedback:</span> {feedback.text}</p>
              <p><span className='text_heading_property'>Feedback Text:</span> {feedback.feedbackText}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserProfile;
