import styles from '../../pages/Home/Home.module.css';

const OrganizationSignContainer = () => {
  return (
 
    <div className={styles.fourth_section}>
    <div className={styles.line1}>
    <h1 className={styles.first_line}>Are you an Organization looking for help?</h1>
    <h2 className={styles.second_line}>Join us now!</h2>
    <img className={styles.arrow} src="../src/Assets/arrow.png" alt="arrow" /> <br />
    <button className={styles.sign_up_btn}>SIGN UP</button>
    </div>
    <img className={styles.line2} src="../src/Assets/Project_70-01 1.png" alt="" />
  </div>

  )
}

export default OrganizationSignContainer
