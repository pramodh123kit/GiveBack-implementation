import styles from './GivebackInfo.module.css';
import logic from '@/assets/giveback-logic.png';

const GivebackInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h1 className={styles.heading}>Logic of GiveBack</h1>
        <p className={styles.about_text}>
          GiveBack is a web application designed to facilitate the process of donating items to those in need within local communities, thereby reducing waste and fostering a spirit of sharing and community support.
          The core functionality of GiveBack revolves around the concept of matching donors with recipients based on the features of the items being donated and requested. This matching process is facilitated by the KNN (K-Nearest Neighbors) algorithm.
        </p>
        <img src={logic} className={styles.image} alt="KNN Algorithm" />
        <p className={styles.about_text}>
          When a recipient submits a request, the KNN algorithm is employed to find the closest match between the requested item and the available donations. This algorithm calculates the Euclidean distance between the features of the requested item and each available donation. The features considered include item type, name, description, and donor address. The donation item with the closest match in terms of these features is identified as the best match for the recipient.
          Once the closest match is determined, the recipient is provided with information about the matched donation item, including its details and the contact information of the donor.
        </p>
      </div>
    </div>
  );
};

export default GivebackInfo;
