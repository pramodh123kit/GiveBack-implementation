import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import 'stream-chat-react/dist/css/index.css';
import Cookies from 'universal-cookie';
import "./App.css";

import { Navbar } from "./components/common-components/Navbar/Navbar";
import { LoggedInNavbar } from "./components/common-components/Navbar/LoggedInNavbar.jsx";
import { Footer } from "./components/common-components/Footer/Footer";
import { Home, Donations, Community, About, Contact, Login, Signup, MeetTheTeam } from "./pages";

function App() {
  const cookies = new Cookies();
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.get('token'));

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!cookies.get('token'));
    };
  
    // Add event listener for custom 'authChange' event
    window.addEventListener('authChange', checkAuthStatus);
  
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? <LoggedInNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MeetTheTeam" element={<MeetTheTeam />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
