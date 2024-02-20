import React from 'react';
import styles from './Donation.module.css';
import SearchBar from '/src/components/donation_page/SearchBar/searchbar.jsx';
import Filter from '/src/components/donation_page/Filter/Filter.jsx'
const Donation = () => {
  return (
    <div className={styles.container}>
     
      <SearchBar/>
      
      
    </div>
  )
}
export default Donation;
