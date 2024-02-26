import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "@/components/community-page/index"

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
   }, authToken)
}

const Community = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  console.log("User is a donator");
} else if (isRecipient) {
  console.log("User is a recipient");
}
  

  return (
   
    <div className="container-community">
      <div className="app__wrapper">
        <Chat client={client} theme="team light">
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
    </div>
  )
}

export default Community
