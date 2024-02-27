import { useState } from 'react';
import styles from '@/pages/Home/Home.module.css';
import arrow from '@/assets/arrow.png';
import orgLogo from '@/assets/Project_70-01 1.png';
import OrganizationRegister from './OrganizationRegister';

const OrganizationSignContainer = () => {
  const [showForm, setShowForm] = useState (false);
  const handleOpenBtn = () => {setShowForm (true)} 
  const handleCloseBtn = () => {setShowForm (false)} 

  return (
    <div className={styles.fourth_section}>
    <div className={styles.line1}>
    <h1 className={styles.first_line}>Are you an Organization looking for help?</h1>
    <h2 className={styles.second_line}>Join us now!</h2>
    <img className={styles.arrow} src={arrow} alt="arrow" /> <br />
        <button className={styles.sign_up_btn} onClick={handleOpenBtn}>
          SIGN UP
        </button>
        {showForm && <OrganizationRegister onClose={handleCloseBtn} />}
      </div>
      <img className={styles.line2} src={orgLogo} alt="orgLogo" />
    </div>

  )
}

export default OrganizationSignContainer
