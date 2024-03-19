import { useState } from 'react';
import styles from "./Contact.module.css";
import mail_icon from '@/assets/mail_icon.svg';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log('Form data:', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleReadFAQs = () => {
       
        window.location.href = '/FAQ'; 
    };

    return (
        <div className={styles.container}>
            <div className={styles.box1}>
                <h1 className={styles.box1_title}>We'd love <br /> to hear <br /> from you</h1>
                <div className={styles.box2}>
                    <img src={mail_icon} alt="mail_icon" className={styles.mail_icon} />
                    <p>Email Us</p>
                    <p>sharewithgiveback@gmail.com</p>
                </div>
                <div>
                    <button className={styles.faq_button} onClick={handleReadFAQs}>Read FAQ's</button>
                </div>
            </div>
            <div className={styles.box3}>
                <form onSubmit={handleSubmit} className={styles.contact_form}>
                    <h2 className={styles.form_title}>Message Us</h2>
                    <input
                        className={styles.form_input}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <input
                        className={styles.form_input} 
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <br />
                    <textarea
                        className={styles.form_textarea}
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button className={styles.form_button} type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
