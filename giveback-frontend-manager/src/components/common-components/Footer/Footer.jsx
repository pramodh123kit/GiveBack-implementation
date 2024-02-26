import logoDark from "@/assets/logoDark.png";
import emailIcon from "@/assets/email-icon.png";
import "./Footer.css";
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Footer = () => {
  return (
    <div className="footer__container">
    <div className="footer__links">
      <div className="footer__links--wrapper">
      <div className="footer__link--items">
      <a href="/contact" id="footer__logo">
            <img
              src={logoDark}
              className="logo"
              alt="Logo"
            />
      </a>
      </div>
        <div className="footer__link--items">
          <h2>Menu</h2>
          <a href="/home">Home</a>
          <a href="/donations">Donations</a>
          <a href="/community">Community Group</a>
          <a href="/contact">Contact</a>
          <a href="/about">About</a>
        </div>
        <div className="footer__link--items">
          <h2>Resources</h2>
          <a href="/MeetTheTeam">Meet The Team</a>
          <a href="/">FAQ</a>
          <a href="/">Terms of Service</a>
        </div>
      </div>
      <div className="footer__links--wrapper">
        <div className="footer__link--items">
          <h2>Contact</h2>
          
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            >
            <img src={emailIcon} className="email-icon" alt="Email Icon"/>
            infoTest@gmail.com</a
          >
        </div>
      </div>
    </div>
  </div>
  );
}