import logoDark from "../../../Assets/logoDark.png";
import emailIcon from "../../../Assets/email-icon.png";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export const Footer = () => {
  return (
    <div className="footer__container  text-light py-4">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="footer__link--items mb-4">
            <a href="/contact" id="footer__logo" className="d-flex align-items-center">
              <img src={logoDark} className="logo" alt="Logo" />
            </a>
          </div>
          <div className="footer__link--items mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Menu</h2>
            <a href="/home">Home</a>
            <a href="/donations">Donations</a>
            <a href="/community">Community Group</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
          </div>
          <div className="footer__link--items mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Resources</h2>
            <a href="/MeetTheTeam">Meet The Team</a>
            <a href="/">FAQ</a>
            <a href="/">Terms of Service</a>
          </div>
          <div className="footer__link--items">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Contact</h2>
            <a
              href="mailto:infoTest@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center"
            >
              <img src={emailIcon} className="email-icon w-25 h-auto mr-2" alt="Email Icon" />
              infoTest@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};