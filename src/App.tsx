import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Navbar from './components/Navbar';
import Services from './components/pages/Services';
import ContactUs from './components/pages/ContactUs';
import WhyUs from './components/pages/WhyUs';
import { useLocation } from 'react-router-dom';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
function App() {

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      // Scroll to top when route changes
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }
  return (
    <Router>
      <div className="App">
        {/* Navbar outside of Routes so it appears on all pages */}
        <Navbar/>
        <ScrollToTop />
        <Routes>
          {/* Main route */}

 <Route path="/" element={<Home/>} />
 <Route path="/services" element={<Services/>} />
 <Route path="/contact-us" element={<ContactUs/>} />
 <Route path="/why-us" element={<WhyUs/>} />
 <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;