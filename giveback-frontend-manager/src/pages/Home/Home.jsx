import styles from "./Home.module.css";
import Cookies from 'universal-cookie';
import OrganizationSignContainer from '../../components/home-page/OrganizationSignContainer.jsx';

const Home = () => {

  const cookies = new Cookies();
  const authToken = cookies.get('token');
 

  return (
    <div className={styles.container}>
      <div className={styles.first_section}>
        <img className={styles.column1} src="../src/Assets/hero-section-image.png" alt="Image" />
        <div className={styles.column2} >
          <h1 className={styles.main_topic}>Introducing <span className={styles.word_giveback}>GiveBack</span></h1>
          <h2 className={styles.sub_topic}>
            ALLOW US TO HELP YOU TO HELP OTHERS
          </h2>
          <p className={styles.paragraph}>
            Our donation app offers a user-friendly platform for effortless and
            personalized giving, ensuring transparency and security. From
            traditional monetary donations to fundraising campaigns, users can
            connect with a community of like-minded individuals to make a
            meaningful impact on various causes. Join us in fostering positive
            change and creating a more compassionate world.
          </p>
        </div>
      </div>

      <div className={styles.second_section}>
        <h1 className={styles.greenline}>WHAT WE DO</h1>
      </div>

      <div className={styles.third_section}>
          <div className={styles.category}>
            <img className={styles.icons} src="../src/Assets/hand.png" alt="Volunteering" />
            <h2>Promote Volunteering Activites</h2>
            <p>
              Inspire change by connecting volunteers with meaningful
              opportunities, fostering a culture of social responsibility and
              collective impact.
            </p>
          </div>

          <div className={styles.category}>
            <img className={styles.icons} src="../src/Assets/heart.png" alt="Volunteering" />
            <h2>Donor Accounts</h2>
            <p>
              Offer users the option to create accounts to track their donation
              history, manage recurring donations, and access tax receipts.
            </p>
          </div>

          <div className={styles.category}>
            <img className={styles.icons} src="../src/Assets/community.png" alt="Volunteering" />
            <h2>Community Groups</h2>
            <p>
              Unite with like-minded individuals, share experiences, and amplify
              your collective impact in creating positive change together.
            </p>
          </div>
      </div>
      {!authToken && <OrganizationSignContainer />}
    </div>
  );
};

export default Home;
