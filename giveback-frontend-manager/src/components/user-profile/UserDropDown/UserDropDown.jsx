import React from 'react';
import Cookies from 'universal-cookie';
import { StreamChat } from "stream-chat";

const cookies = new Cookies();

const apiKey = '93grt8nxgs6j';
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

const UserDropDown = ({ onClose, redirectToUserProfile }) => {
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
      <div className="dropdown">
        <button onClick={() => handleRedirect(0)}>My Profile</button>
        <button onClick={() => handleRedirect(1)}>My Donation History</button>
        <button onClick={() => handleRedirect(2)}>My Feedback</button>
        <button onClick={() => handleRedirect(3)}>My Ratings</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  };
  
export default UserDropDown;
