import { useChatContext } from "stream-chat-react";
import { useState } from "react";
import { UserList } from "@/components/community-page/index.js";
import { CloseCreateChannel } from '@/assets/CloseCreateChannel.jsx'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const { client, setActiveChannel } = useChatContext(); 
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext(); 
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  const [channelName, setChannelName] = useState('');

  const createChannel = async (event) => {
    event.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

 return (
    <div className="create-channel__container">
        <div className="create-channel__header">
          <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
          <CloseCreateChannel setIsCreating={setIsCreating} />
        </div>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
        <UserList setSelectedUsers={setSelectedUsers}/>
        <div className="create-channel__button-wrapper" onClick={createChannel}>
            <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
        </div>
    </div>
  );
};

export default CreateChannel;
