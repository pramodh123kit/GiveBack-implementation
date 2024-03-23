import Card from '@/components/meet-the-team-components/TeamCard/Card'
import styles from './MeetTheTeam.module.css';
import pramodh from '@/assets/pramodh.png';
import isindu from '@/assets/isindu.jpg';
import tharusha from '@/assets/chamikara.jpg';
import chethana from '@/assets/chethana.jpg';
import akash from '@/assets/akash.jpg';

const MeetTheTeam = () => {
  return (
    <div className={`${styles.container} mx-auto w-80`}>
      <div className={`${styles.meet_container} bg-green-200 rounded-lg shadow-md mb-16`}>
        <div className={`${styles.heading} font-bold text-center text-2xl my-8 pt-12`}>
          <h1>Meet The Team</h1>
        </div>
        <div className={`${styles.card_container} flex justify-center items-center flex-wrap gap-8`}>
          <div className={`${styles.card} shadow-md w-64 h-96 bg-white rounded-md mb-16`}>
            <img className={`${styles.prof_pic} rounded-t-md w-64 h-32`} src={pramodh} alt="Profile Picture" />
            <Card name="Pramodh Lihinikaduwa" role="Team Leader" email="pramodh.20220414@iit.ac.lk" github="https://github.com/pramodh123kit" linkedin="https://www.linkedin.com/in/pramodh-lihinikaduwa/" />
          </div>
          <div className={`${styles.card} shadow-md w-64 h-96 bg-white rounded-md mb-16`}>
            <img className={`${styles.prof_pic} rounded-t-md w-64 h-32`} src={isindu} alt="Profile Picture" />
            <Card name="Isindu Nimandith" role="Developer" email="nimandith.20220413@iit.ac.lk" linkedin="https://www.linkedin.com/in/isindu-nimandith-432228299/" github="https://github.com/IsinduNimandith23" />
          </div>
          <div className={`${styles.card} shadow-md w-64 h-96 bg-white rounded-md mb-16`}>
            <img className={`${styles.prof_pic} rounded-t-md w-64 h-32`} src={tharusha} alt="Profile Picture" />
            <Card name="Tharusha Chamikara" role="Developer" email="tharusha.20221339@iit.ac.lk" linkedin="https://www.linkedin.com/in/tharusha-chamikara-158798256/" github="https://github.com/chamikarapasquel" />
          </div>
          <div className={`${styles.card} shadow-md w-64 h-96 bg-white rounded-md mb-16`}>
            <img className={`${styles.prof_pic} rounded-t-md w-64 h-32`} src={chethana} alt="Profile Picture" />
            <Card name="Chethana Gayanath" role="Developer" email="chethana.20210674@iit.ac.lk" linkedin="https://www.linkedin.com/in/chethana-gayanath-843719298/" github="https://github.com/chethana87" />
          </div>
          <div className={`${styles.card} shadow-md w-64 h-96 bg-white rounded-md mb-16`}>
            <img className={`${styles.prof_pic} rounded-t-md w-64 h-32`} src={akash} alt="Profile Picture" />
            <Card name="Akash Hewavickrama" role="Developer" email="chandrasekara.20222237@iit.ac.lk" linkedin="https://www.linkedin.com/in/rajeev-hewavickrama-5297bb266/" github="https://github.com/RajeevAkash" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;