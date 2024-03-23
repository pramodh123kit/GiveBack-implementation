import { useState } from "react";
import { ChannelList, ChatAutoComplete, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import Cookies from "universal-cookie";
import "@/pages/Community/Community.css";

const cookies = new Cookies();

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Community Page</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ 
    isCreating,
    setIsCreating,
    setCreateType,
    setIsEditing,
    setToggleContainer
}) => {

  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');
    cookies.remove('isDonator');
    cookies.remove('isRecipient');

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type = "team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )} 
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList 
              {...listProps}
              type= "messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )} 
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
          />
      </div>
     
    </>
  )
}

const ChannelListContainer = ({ 
    setCreateType,
    setIsCreating, 
    setIsEditing 
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent 
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div className="channel-list__container-responsive"
         style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
      >
        <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
        </div>

        <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />

      </div>
    </>
  )
}

export default ChannelListContainer
