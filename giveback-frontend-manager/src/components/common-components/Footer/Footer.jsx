import logoDark from "@/assets/logoDark.png";
import emailIcon from "@/assets/email-icon.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer__container text-light py-4">
      <div className="container">
        <div className="footer__links">
          <div className="footer__links--wrapper">
            <div className="footer__link--items mb-4">
              <a href="/contact" id="footer__logo" className="d-flex align-items-center">
                <img src={logoDark} className="logo" alt="Logo" />
              </a>
            </div>
            <div className="footer__link--items mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Menu</h2>
              <a href="/home">Home</a>
              <a href="/charities">Donations</a>
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
                href="mailto:sharewithgiveback@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center"
              >

            <div className="logOut_container">
                            <div className="logOut_button">
                                <img
                                  className="emailLOGO"
                                  src={emailIcon}
                                  alt="Email Icon"
                                />
                                <p>sharewithgiveback@gmail.com</p>
                            </div>
                      </div>

                
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
