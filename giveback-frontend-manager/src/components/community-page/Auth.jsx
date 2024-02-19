import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import styles from '../auth-styles/Auth.module.css';

import image from '../../Assets/Group11.svg';
import quotationImg from '../../Assets/Frame.svg';

const cookies = new Cookies();

const initialState = {
  fullName:'',
  username:'',
  phoneNumber:'', 
  avatarURL:'',
  password:'',
  confirmPassword:'',
}

const Auth = ({ defaultMode  }) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(defaultMode === 'signup');
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { username, password, phoneNumber, avatarURL } = form;
  
    const URL = 'http://localhost:5000/auth';
  
    try {
      const response = await axios.post(
        `${URL}/${isSignup ? 'signup' : 'login'}`,
        {
          username,
          password,
          fullName: form.fullName, // Make sure to include fullName if it's always expected
          phoneNumber,
          avatarURL,
        }
      );
  
      const { token, userId, hashedPassword, fullName } = response.data;
  
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);
  
      if (isSignup) {
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }
  
      window.location.reload();
    } catch (error) {
      // Handle error appropriately
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className={styles.auth_container}>
      <div className={styles.container_left}>
        <img src={quotationImg} className={styles.quotation_img}/>
        <h1 className={styles.share_h2}>Share, Connect, Thrive</h1>
        <img src={image} className={styles.left_image}/>
      </div>
    <div className={styles.container_right}>
      <h2 className={styles.share_h2}>{isSignup ? 'Create Account' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
            <div className={styles.inputBox}>
              <label htmlFor='fullName'>Full Name</label>
              <input 
                name="fullName" 
                type="text" 
                placeholder="Full Name" 
                onChange={handleChange}
                required 
               />
            </div>
            )}
            <div className={styles.inputBox}>
              <label htmlFor='username'>Username</label>
              <input 
                name="username" 
                type="text" 
                placeholder="Username" 
                onChange={handleChange}
                required 
               />
            </div>
            {isSignup && (
            <div className={styles.inputBox}>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input 
                name="phoneNumber" 
                type="text" 
                placeholder="Phone Number" 
                onChange={handleChange}
                required 
               />
            </div>
            )}
            {isSignup && (
            <div className={styles.inputBox}>
              <label htmlFor='avatarURL'>Avatar URL</label>
              <input 
                name="avatarURL" 
                type="text" 
                placeholder="Avatar URL" 
                onChange={handleChange}
                required 
               />
            </div>
            )}
            <div className={styles.inputBox}>
              <label htmlFor='password'>Password</label>
              <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                onChange={handleChange}
                required 
               />
            </div>
            {isSignup && (
            <div className={styles.inputBox}>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input 
                name="confirmPassword" 
                type="password" 
                placeholder="Confirm Password" 
                onChange={handleChange}
                required 
               />
            </div>
            )}
            <div>
              <button>{isSignup ? "Create Account" : "Log In"}</button>
            </div>
      </form>
      <div>
        <p className={styles.auth_p}>
         {isSignup ? 'Already have an account? ' : "Don't have an account? "}
         <span className={styles.switch} onClick={switchMode}>
            {isSignup ? 'Login' : 'Sign Up'}
         </span>
        </p>
      </div>
    
    </div>
    </div>

  )
}

export default Auth
