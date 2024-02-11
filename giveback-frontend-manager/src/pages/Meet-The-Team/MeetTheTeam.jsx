import Card from '../../components/meet-the-team-components/TeamCard/Card'
import styles from './MeetTheTeam.module.css';
import icon from '../../Assets/icon.png';

const MeetTheTeam = () => {
  return (
    <div className={styles.container}>
      <div className={styles.meet_container}>
      <div className={styles.heading}>
        <h1>Meet The Team</h1>
      </div>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <img className={styles.prof_pic} src={icon}></img>
          <Card name="Pramodh Lihinikaduwa" role="Team Leader" email="pramodh.20220414@iit.ac.lk" github="https://github.com/pramodh123kit" linkedin="https://www.linkedin.com/in/pramodh-lihinikaduwa/" />
        </div>
        <div className={styles.card}>
          <img className={styles.prof_pic} src={icon}></img>
          <Card name="Isindu Nimandith" role="Developer" email="nimandith.20220413@iit.ac.lk"  linkedin="https://www.linkedin.com/in/isindu-nimandith-432228299/" github="https://github.com/IsinduNimandith23" />
        </div>
        <div className={styles.card}>
          <img className={styles.prof_pic} src={icon}></img>
          <Card name="Tharusha Chamikara" role="Developer" email="tharusha.20221339@iit.ac.lk" linkedin="https://www.linkedin.com/in/tharusha-chamikara-158798256/" github="https://github.com/chamikarapasquel" />
        </div>
        <div className={styles.card}>
          <img className={styles.prof_pic} src={icon}></img>
          <Card name="Chethana Gayanath" role="Developer" email="chethana.20210674@iit.ac.lk" linkedin="https://www.linkedin.com/in/chethana-gayanath-843719298/" github="https://github.com/chethana87" />
        </div>
        <div className={styles.card}>
          <img className={styles.prof_pic} src={icon}></img>
          <Card name="Akash Hewavickrama" role="Developer" email="chandrasekara.20222237@iit.ac.lk" linkedin="" github="https://github.com/RajeevAkash" />
        </div>
      </div>
        
      
      </div>
  
    </div>
  )
}

export default MeetTheTeam
