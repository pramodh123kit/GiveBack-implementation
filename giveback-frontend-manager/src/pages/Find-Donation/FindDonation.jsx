import React, { useState, useEffect } from "react";
import styles from './FindDonation.module.css';
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import ShowDonationList from '../../components/community-page/show-donation/ShowDonationList';
import FilterSystem from "../../components/find-donation/Filter/Filter";
import RecipientForm from '@/components/community-page/request-form/RecipientForm';

const cookies = new Cookies();

const apiKey = 'ehvtd7wtcmck';
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

const FindDonation = () => {
  const [closestMatch, setClosestMatch] = useState(null);
  const [recipientFormSubmitted, setRecipientFormSubmitted] = useState(false);
  const [showRecipientForm, setShowRecipientForm] = useState(false);
  const [filter, setFilter] = useState('');

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

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleCloseRecipientForm = () => {
    setShowRecipientForm(false);
  };

  return (
    <div className={styles.container}>
      <FilterSystem onFilter={handleFilterChange} />

      <button className="recieve-btn" onClick={() => setShowRecipientForm(true)}>
        Are you looking for donations?
      </button>
      {showRecipientForm && (
        <RecipientForm
          onClose={handleCloseRecipientForm}
          setClosestMatch={setClosestMatch}
          onSubmit={() => {
            setRecipientFormSubmitted(true);
            setShowRecipientForm(false); // Hide the form when submitted
          }}
        />
      )}

      <ShowDonationList filter={filter} closestMatch={closestMatch} recipientFormSubmitted={recipientFormSubmitted} />
    </div>
  );
};

export default FindDonation;
