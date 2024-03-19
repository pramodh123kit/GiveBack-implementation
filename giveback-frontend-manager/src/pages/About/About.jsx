import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h1 className={styles.heading}> What is GiveBack</h1>
        <p className={styles.about_text}>
          GiveBack is a purpose-driven web platform dedicated to connecting
          those with resources to spare with those in need. By facilitating the
          donation of various items and enabling organizations to showcase their
          charitable efforts, GiveBack strives to reduce waste and address
          community needs effectively. With its integrated chat feature,
          GiveBack fosters community engagement and collaboration, empowering
          users to make a tangible difference in the lives of others. Join us in
          our mission to create a more compassionate and supportive world
          through giving back.
        </p>
        <button className={styles.meetTheTeam_button}>
          <a href="/giveback-info">Read about logic of the algorithm</a>
        </button>
      </div>

      <div className={styles.lower}>
        <h1 className={styles.heading}>Who are we ?</h1>
        <p className={styles.about_text}>
          We are "Team GiveBack," a group of second-year undergraduate students
          enrolled in the Computer Science degree program at the University of
          Westminster. As part of our Software Development Group Project (SDGP)
          coursework, we developed GiveBack with the aim of creating a platform
          that facilitates the donation of various items to those in need within
          local communities. Our goal is to reduce waste and foster a spirit of
          giving and community support. Through GiveBack, we provide users with
          an intuitive and accessible platform to connect donors with
          recipients, as well as a vibrant chat application to encourage
          collaboration and engagement. We are committed to making a positive
          impact and are proud to offer GiveBack as a valuable resource
          completely free of charge.
        </p>
        <button className={styles.meetTheTeam_button}>
          <a href="/MeetTheTeam">Meet the team</a>
        </button>
      </div>
    </div>
  );
};

export default About;
