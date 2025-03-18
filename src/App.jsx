import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase/firebase'; // Import frm firebase.js file

// Import components
import Header from './landingpage/Components/Header/Header';
import Hero from './landingpage/Components/Herosection/Hero';
import City from './landingpage/Components/Popular/City';
import AboutPage from './landingpage/Components/Aboutus/About';
import Process from './landingpage/Components/Process/TripBookingProcess';
import VideoHero from './landingpage/Components/Bgvideo/VideoHero';
import Testimonials from './landingpage/Components/Testimonials/Testimonials';
import SubscribeSection from './landingpage/Components/Subscribe/SubscribeSection';
import ContactSection from './landingpage/Components/Contact/ContactSection';
import Footer from './landingpage/Components/Footer/Footer';
import Packages from './landingpage/Components/Packages/Packages';
import Guide from './Guide/Guide';
import TourPackages from './Tours/GoldenTrianglr/TourPackages';
import WeekendTours from './Tours/weekendTour/WeekendTour';
import HillStation from './Tours/HillStation/HillStation';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
// Import other package components as needed (Goa, Kerala, etc.)


const Home = () => {
  return (
    <>
      <Hero />
      <City />
      <AboutPage />
      <Process />
      <VideoHero />
      <Packages />
      <Testimonials />
      <SubscribeSection />
      <ContactSection />
    </>
  );
};

// Main App component
const App = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

      
  return (
    <div className="app">
      <Header navigate={navigate} />
      <main className="main-content">
        <Routes>
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/weekend-tours" element={<WeekendTours />} />
          <Route path="/packages/hill-station-tours" element={<HillStation />} />
          <Route path="/packages/golden-triangle-tours" element={<TourPackages />} />
          {/* <Route path="/packages/goa-tour" element={<Goa />} /> */}
          {/* <Route path="/packages/kerala-tour" element={<Kerala />} /> */}
          {/* <Route path="/packages/summer-holiday-tour" element={<SummerHoliday />} /> */}
          {/* <Route path="/packages/beach-vacation-tours" element={<BeachVacation />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;