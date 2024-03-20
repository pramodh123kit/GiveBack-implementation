import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import styles from '../auth-styles/Auth.module.css';

import image from '@/assets/Group11.svg';
import quotationImg from '@/assets/Frame.svg';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  phoneNumber: '',
  avatarURL: '',
  password: '',
  confirmPassword: '',
  isDonator: false,
  isRecipient: false,
};

const Auth = ({ defaultMode }) => {
  const [form, setForm] = useState({
    ...initialState,
    isDonator: false,
    isRecipient: false,
  });
  const [isSignup, setIsSignup] = useState(defaultMode === 'signup');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
  
    setForm((prevForm) => {
      if (type === 'checkbox') {
        if (name === 'isDonator') {
          return {
            ...prevForm,
            isDonator: checked,
            isRecipient: checked ? false : prevForm.isRecipient,
          };
        }
        if (name === 'isRecipient') {
          return {
            ...prevForm,
            isRecipient: checked,
            isDonator: checked ? false : prevForm.isDonator,
          };
        }
      } else {
        return {
          ...prevForm,
          [name]: type === 'checkbox' ? checked : e.target.value,
        };
      }
    });
  };
  

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { username, password, phoneNumber, avatarURL, isDonator, isRecipient } = form;
  
    if (!isDonator && !isRecipient) {
      setError('Please select either Donator or Recipient!');
      return;
    }
  
    const URL = 'https://project-giveback.azurewebsites.net/auth';
  
    try {
      const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username, password, fullName: form.fullName, phoneNumber, avatarURL, isDonator, isRecipient,
      });
  
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);
      cookies.set('isDonator', isDonator); 
      cookies.set('isRecipient', isRecipient); 
  
      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }
  
      window.dispatchEvent(new Event('authChange'));
  
      navigate('/home');
      window.location.reload();
    } catch (error) {
      console.error('Authentication failed:', error);
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_container_left}>
        <img src={quotationImg} className={styles.quotation_img}/>
        <h1 className={styles.share_h2}>Share, Connect, Thrive</h1>
        <img src={image} className={styles.left_image}/>
      </div>

      <div className={styles.auth_container_right}>
        <h2 className={styles.share_h2}>{isSignup ? 'Create Account' : 'Log In'}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className={styles.auth_form}>
              <label className={styles.auth_label} htmlFor='fullName'>Full Name</label>
              <input 
                className={styles.auth_input}
                name="fullName" 
                type="text" 
                onChange={handleChange}
                required 
              />
            </div>
          )}
          <div className={styles.auth_form}>
            <label className={styles.auth_label} htmlFor='username'>Username</label>
            <input 
              className={styles.auth_input}
              name="username" 
              type="text" 
              onChange={handleChange}
              required 
            />
          </div>
          {isSignup && (
            <div className={styles.auth_form}>
              <label className={styles.auth_label} htmlFor='phoneNumber'>Phone Number</label>
              <input 
                className={styles.auth_input}
                name="phoneNumber" 
                type="text" 
                onChange={handleChange}
                required 
              />
            </div>
          )}
          {isSignup && (
            <div className={styles.auth_form}>
              <label className={styles.auth_label} htmlFor='avatarURL'>Email</label>
              <input 
                className={styles.auth_input}
                name="avatarURL" 
                type="text" 
                onChange={handleChange}
                required 
              />
            </div>
          )}
          <div className={styles.auth_form}>
            <label className={styles.auth_label} htmlFor='password'>Password</label>
            <input 
              className={styles.auth_input}
              name="password" 
              type="password" 
              onChange={handleChange}
              required 
            />
          </div>
          {isSignup && (
            <div className={styles.auth_form}>
              <label className={styles.auth_label} htmlFor='confirmPassword'>Confirm Password</label>
              <input 
                className={styles.auth_input}
                name="confirmPassword" 
                type="password" 
                onChange={handleChange}
                required 
              />
            </div>
          )}

          <div className={styles.auth_form}>
            <label className={styles.auth_checkbox}>
              <input
                className={styles.auth_input_checkbox}
                type="checkbox"
                name="isDonator"
                checked={form.isDonator}
                onChange={handleChange}
              />
              Donator
            </label>
          </div>

          <div className={styles.auth_form}>
            <label className={styles.auth_checkbox}> 
              <input
                className={styles.auth_input_checkbox}
                type="checkbox"
                name="isRecipient"
                checked={form.isRecipient}
                onChange={handleChange}
              />
              Recipient
            </label>
          </div>

          <div>
            <button className={styles.auth_log_button}>{isSignup ? "Create Account" : "Log In"}</button>
          </div>
        </form>
        <p className={styles.auth_p}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span className={styles.switch} onClick={switchMode}>
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
          {error && <span className={styles.error_message}>{error}</span>}
        </p>

      </div>
    </div>
  );
};

export default Auth;