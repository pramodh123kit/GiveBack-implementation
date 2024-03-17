import React from 'react';
import styles from './About.module.css';


const About = () => {
  return (
    
		
      <div className={styles.container}>
        <div className={styles.upper}>
          
            <h2> What is GiveBack</h2>

            <p>
             Give-Back is a revolutionary donation app that empowers users to make a positive impact by connecting them with causes they are 
             about. With its user friendly interface ,personolized giving options, and transparent donation tracking. GiveBack ensures a seamless 
             and ,meaningful philantrophic experience.The app fosters commuinity engagement ,allowing users to join a like-minded commuinity,share experienses
             and collectively contribute to impactful projects.With easy payment options,recognition rewards,and a focus on impactful campaigns,GiveBack transends
             traditional donation platforms, transforming the act of giving into a
            </p>
          
        </div>

        <div className={styles.lower}>

            <h2> Who are we ?</h2>

            <p>
              we are students of computer science degree program and we devoloping this app as our second year project
            </p>

            <button className={styles.btn}><a href='/MeetTheTeam'><b>Meet the team </b> </a></button>
        </div>

        
      </div>
	  
  );
};

export default About;
