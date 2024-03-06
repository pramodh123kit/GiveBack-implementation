import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '@/assets/demoOrg.png';
import styles from './OrganizationView.module.css';

const OrganizationView = () => {
  const [organizations, setOrganizations] = useState([]);

  const handleShowOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getOrganizations');
      setOrganizations(response.data);

    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    handleShowOrganizations();
  }, []);

  return (
    <div className={styles.large_container}>
      <ul className={styles.ul_organization}>
      <div className={styles.container_organizations}>
        {organizations.map((organization) => (
          <li key={organization._id}>
          <div className={styles.organization_container}>
          <div className={styles.left_container}>
            <h1 className={styles.heading}>{organization.orgName}</h1>
            <p className={styles.description}>{organization.summary}</p>
            <p>{organization.permit}</p>
            <p>{organization.contactNumber}</p>
            <p>{organization.type}</p>
            <p>{organization.quantity}</p>

            <button className={styles.match_btn}>Donate</button>
          </div>
          <div className={styles.right_container}>
           <img src={image} alt="Organization" className={styles.image} />
          </div>
          
            {/* {organization.image && (
            <div>
            <p>Image:</p>
            <img
                src={`http://localhost:5000/api/getImage/${organization._id}`}
                alt={`Organization ${organization._id}`}
               />
            </div>           
            )} */}
          </div>
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
};

export default OrganizationView;