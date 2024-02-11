import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import "../../pages/Community/Community.css";
import { ResultsDropdown } from '../community-page/index.js';
import { SearchIcon } from '../../Assets/SearchIcon'

const ChannelSearch = ({ setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query]);

  const getChatChannels = async (text) => {
    try {
       const channelResponse = client.queryChannels({
        type: 'team',
        name: { $autocomplete: text },
        members: { $in: [client.userID]}
       });
       const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text }
       })

        const [channels, { users }] = await Promise.all([channelResponse, userResponse]);
    
        if (channels.length) setTeamChannels(channels);
        if (users.length) setDirectChannels(users);

      } catch (error) {
        setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChatChannels(e.target.value);
  }

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  }

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className='channel-search__input_icon'>
          <SearchIcon />
        </div>
        <input 
          className='channel-search__input__text' 
          placeholder='Search' 
          type='text' 
          value={query} 
          onChange={onSearch} 
          />
      </div>
      { query && (
        <ResultsDropdown 
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
          />
      )}
    </div>
  )
}

export default ChannelSearch
