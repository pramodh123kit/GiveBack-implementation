import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import styles from './OrganizationView.module.css';
import noOrgImage from '@/assets/noOrg.jpg';

import DonationFormForOrganization from '../DonatingForm/DonationFormForOrganization';
import OrganizationDetailsModal from '../OrganizationDetailsModal/OrganizationDetailsModal'; 

const cookies = new Cookies();
const apiKey = 'ehvtd7wtcmck';
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
  }, authToken);
}

const OrganizationView = ({ organization  }) => {
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null); 
  const [showDetailsModal, setShowDetailsModal] = useState(false); 

  const [organizationEmail, setOrganizationEmail] = useState('');

  const handleCloseDonateForm = () => setShowDonateForm(false);

  const handleShowOrganizations = async () => {
    try {
      const response = await axios.get('https://project-giveback.azurewebsites.net/api/getOrganizations');
      setOrganizations(response.data);

    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const handleDonateClick = async (organizationId) => {
    if (!authToken) {
      setShowLoginMessage(true);
      return;
    }
  
    try {
      // Fetching the organization email
      const response = await axios.get(`https://project-giveback.azurewebsites.net/api/getOrganizationEmail/${organizationId}`);
      const orgEmail = response.data.email;
      console.log('Organization Email:', orgEmail);
     
      setOrganizationEmail(orgEmail);
      setShowDonateForm(true);
    } catch (error) {
      console.error('Error fetching organization email:', error);
      setErrorMessage('Error fetching organization email. Please try again.');
    }
  };

  const handleYourButtonClick = (organizationId) => {
    const selectedOrg = organizations.find(org => org._id === organizationId);
    setSelectedOrganization(selectedOrg);
    setShowDetailsModal(true);
  };

  useEffect(() => {
    handleShowOrganizations();
  }, []);

  return (
    <div className={styles.large_container}>
      {showLoginMessage && (
        <h1 className={styles.notLogged_community}>Please log in as a donator to access this feature</h1>
      )}

      {organizations.length === 0 ? (
        <div className={styles.noOrg_container}>
          <img src={noOrgImage} className={styles.noOrgImage} />
          <h1 className={styles.noOrg_heading}>No organizations/charities are registered yet</h1>
        </div>

      ) : (
        <ul className={styles.ul_organization}>
          <div className={styles.container_organizations}>
            {organizations.map((organization) => (
              <li key={organization._id}>
                <div className={styles.organization_container}>
                  <div className={styles.left_container}>
                    <h1 className={styles.heading}>{organization.orgName}</h1>
                    <p className={styles.description}>{organization.summary}</p>
                    <p><span className='text_heading_property'><span className={styles.type_label}>Type:</span></span> {organization.type}</p>
                    <div className={styles.conatainer_button}>
                      <button className={styles.match_btn} onClick={() => handleDonateClick(organization._id)}>
                        Donate
                      </button>
                      <button className={styles.details_btn} onClick={() => handleYourButtonClick(organization._id)}>
                        View more details
                      </button>
                    </div>
                  </div>
                  {showDonateForm && (
                    <DonationFormForOrganization
                      onClose={() => setShowDonateForm(false)}
                      organizationEmail={organizationEmail} 
                    />
                  )}
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
              </li>
            ))}
          </div>
        </ul>
      )}

      {errorMessage && <div className={styles.error_message}>{errorMessage}</div>}

      {/* Modal for organization details */}
      {showDetailsModal && selectedOrganization && (
        <OrganizationDetailsModal
          organization={selectedOrganization}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default OrganizationView;
