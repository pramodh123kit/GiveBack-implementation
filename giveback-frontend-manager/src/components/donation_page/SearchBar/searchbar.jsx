import React, { useState } from 'react';
import styles from './searchBar.module.css'; 
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
    <form className={styles['search-bar']} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className={styles['search-input']}
      />
      {searchTerm && (
        <button type="button" className={styles['clear-icon']} onClick={handleClear}>
          <IoIosClose className={styles['close-icon']} />
        </button>
      )}
      <button type="submit" className={styles['search-icon']}>
        <FaSearch className={styles['search-icon']} />
      </button>
    </form>
  );
};

export default SearchBar;
