import React from 'react';
import styles from './OrganizationDetailsModal.module.css';
import image from '@/assets/close_iconn.svg';

const OrganizationDetailsModal = ({ organization, onClose }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <img src={image} className={styles.closeButton} onClick={onClose} />
        <h2 className={styles.heading}>{organization.orgName}</h2>
        <p><strong>Address:</strong> {organization.address}</p>
        <p><strong>Contact Number:</strong> {organization.contactNumber}</p>
        <p><strong>Type of Donations Needed:</strong> {organization.type}</p>
        <p><strong>Quantity:</strong> {organization.quantity}</p>
        <p><strong>Beneficiary:</strong> {organization.forWho}</p>
        <p><strong>Summary:</strong> {organization.summary}</p>
        {organization.image && (
                    <div>
                      <img
                        className={styles.image}
                        src={`https://project-giveback.azurewebsites.net/api/getOrganizationImage/${organization._id}`}
                        alt={`Organization ${organization._id}`}
                      />
                    </div>           
                  )}
      </div>
    </div>
  );
};

export default OrganizationDetailsModal;
