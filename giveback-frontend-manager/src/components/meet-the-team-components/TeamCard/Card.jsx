import styles from './Card.module.css';
import linkedIn from '@/Assets/linkedIn.png';
import gitHub from '@/Assets/github.png';

function Card(props){

  const linkedIn_link = props.linkedin;
  const gitHub_link = props.github;
  return (
    <div className={styles.card}>
  
      <h2 className={styles.name}>{props.name}</h2>
      <h3 className={styles.role}>{props.role}</h3>
      <a href={linkedIn_link} target='_blank'><img src={linkedIn} className={styles.linkedin_logo}></img></a>
      <a href={gitHub_link} target='_blank'><img src={gitHub} className={styles.github_logo}></img></a> 
      <p>To contact me, please send an email to</p>
      <p className={styles.email}>{props.email}</p>
    </div>
  );
}

export default Card
