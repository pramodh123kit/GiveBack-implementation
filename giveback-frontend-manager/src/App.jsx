import { Route, Routes } from "react-router-dom";
import 'stream-chat-react/dist/css/index.css';
import "./App.css";

import { Navbar } from "./components/common-components/Navbar/Navbar";
import { Footer } from "./components/common-components/Footer/Footer";
import { Home, Donations, Community, About, Contact, Login, Signup, MeetTheTeam } from "./pages";

function App() {
  return (
    <div className="App">
      <Navbar />
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
