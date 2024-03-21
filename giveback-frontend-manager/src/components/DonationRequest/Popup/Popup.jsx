import styles from './Popup.module.css';

const Popup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popup_container}>
      <div className={styles.popup_content}>
        <p>{message}</p>
        <div className={styles.popup_buttons}>
          <button className={styles.primary} onClick={onConfirm}>Yes</button>
          <button className={styles.secondary} onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
