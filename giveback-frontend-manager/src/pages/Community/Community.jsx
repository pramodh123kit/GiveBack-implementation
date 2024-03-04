import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import ClosestMatch from "../../components/community-page/closest-match/ClosestMatch";

import { ChannelContainer, ChannelListContainer, Auth, ShowDonationList } from "@/components/community-page/index"
import DonatorForm from '@/components/community-page/request-form/DonatorForm';
import RecipientForm from '@/components/community-page/request-form/RecipientForm';

import 'stream-chat-react/dist/css/index.css';

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

const Community = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [closestMatch, setClosestMatch] = useState(null);
  const [showClosestMatch, setShowClosestMatch] = useState(false);
  const [recipientFormSubmitted, setRecipientFormSubmitted] = useState(false);

  const [showDonateForm, setShowDonateForm] = useState(false);
  const [showDonationList, setShowDonationList] = useState(false);

  const handleOpenDonateForm = () => setShowDonateForm(true);
  const handleCloseDonateForm = () => setShowDonateForm(false);

  const handleOpenDonationList = () => setShowDonationList(true);
  const handleCloseDonationList = () => setShowDonationList(false);

  const handleOpenClosestMatch = () => setShowClosestMatch(true);
  const handleCloseClosestMatch = () => setShowClosestMatch(false);

  const isDonator = cookies.get('isDonator');
  const isRecipient = cookies.get('isRecipient');

  useEffect(() => {
    async function importStyles() {
      if (isDonator) {
        const module = await import('./Community2.css');
      } else if (isRecipient) {
        const module = await import('./Community.css');
      }
    }

    importStyles();
  }, [isDonator, isRecipient]);

  if (!authToken) {
    return (
      <>
        <h1 className="notLogged-community">Please log in to access this feature</h1>
        <Auth defaultMode="login" />
      </>
    );
  }

  if (isDonator) {
    // console.log("User is a donator");
  } else if (isRecipient) {
    // console.log("User is a recipient");
  }

  return (
    <div className="container-community">
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
          {/* Donator Form */}
          {isDonator && (
            <>
              {/* ... */}
            </>
          )}

          {/* Recipient Form */}
          {isRecipient && (
            <>
              {/* ... */}
            </>
          )}

          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />

          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
      </div>

      {isDonator && (
        <>
          <button className="donate-btn" onClick={handleOpenDonateForm}>
            DONATE
          </button>
          {showDonateForm && <DonatorForm onClose={handleCloseDonateForm} />}
          <button className="donate-btn-list" onClick={handleOpenDonationList}>
            Donation list
          </button>
          {showDonationList && <ShowDonationList onClose={handleCloseDonationList} />}
        </>
      )}
      {isRecipient && (
        <>
          <button className="recieve-btn" onClick={handleOpenDonateForm}>
            Are you looking for donations?
          </button>
          {showDonateForm && <RecipientForm onClose={handleCloseDonateForm} setClosestMatch={setClosestMatch} onSubmit={() => setRecipientFormSubmitted(true)} />}
          {recipientFormSubmitted && (
            <>
              <button className="match-btn" onClick={handleOpenClosestMatch}>
                CLOSEST MATCH
              </button>
              {showClosestMatch && <ClosestMatch closestMatch={closestMatch} onClose={handleCloseClosestMatch} />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Community;
