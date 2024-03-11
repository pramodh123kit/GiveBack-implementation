import React from 'react';
import styles from './Donation.module.css';
import SearchBar from '/src/components/donation_page/SearchBar/searchbar.jsx';
import Filter from '/src/components/donation_page/Filter/Filter.jsx'
import OrganizationView from '/src/components/donation_page/OrganizationView/OrganizationView.jsx';

const Donation = () => {
  return (
    <div className={styles.container}>
     
     {/* <SearchBar/> */}
       {/* <Filter/> */}
      <OrganizationView/>
      
      
    </div>
  )
}
export default Donation;
