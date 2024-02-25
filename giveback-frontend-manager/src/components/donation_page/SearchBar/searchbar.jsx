import React, { useState } from 'react';
// import './searchBar.css'; <= Pramodh commented this line temporarily
import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <button type="button" className="clear-icon" onClick={handleClear}>
          <IoIosClose className="fas fa-times" />
        </button>
      )}
      <button type="submit" className="search-icon">
        <FaSearch className="fas fa-search" />
      </button>
    </form>
  );
};

export default SearchBar;
