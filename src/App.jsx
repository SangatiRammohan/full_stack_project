import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Backend/Firebase/firebase';
import { motion } from "framer-motion";

import './App.css'

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
import {Tour} from './Toursfile/Tour';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import PaymentSuccess from './Toursfile/PaymentSuccess';
import MyBookings from './Toursfile/MyBookings';
// import { PaymentSuccessfully, GuideSelection } from '/src/Toursfile/Tour.jsx';
const Home = () => {
  return (
    <>
      <Hero />
      <City />
      <AboutPage />
      <Process />
      <VideoHero />
      <Testimonials />
      <SubscribeSection />
      <ContactSection />
    </>
  );
};

// Component for rendering individual destinations
const TourDestination = () => {
  const { packageType, destinationIndex } = useParams();
  console.log("TourDestination component rendering with:", { packageType, destinationIndex });
  return <Tour packageType={packageType} destinationIndex={parseInt(destinationIndex, 10)} />;
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
    return (
      <div className="loading-container">
        <motion.div
          className="loading-box"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="loading-text"></div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/packages" element={<Packages />} />
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {/* <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} /> */}
        <Route path="/packages/:packageType" element={<Tour />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-bookings" element={user ? <MyBookings /> : <Navigate to="/signin" />} />
        {/* <Route path='' */}
        {/* Both underscore and hyphen versions of routes */}
        <Route path="/packages/weekend_tours" element={<Tour packageType="weekend_tours" />} />
        <Route path="/packages/weekend-tours" element={<Tour packageType="weekend_tours" />} />
        
        <Route path="/packages/summer_holiday_tour" element={<Tour packageType="summer_holiday_tour" />} />
        <Route path="/packages/summer-holiday-tour" element={<Tour packageType="summer_holiday_tour" />} />
        
        <Route path="/packages/kerala_tour" element={<Tour packageType="kerala_tour" />} />
        <Route path="/packages/kerala-tour" element={<Tour packageType="kerala_tour" />} />
        
        <Route path="/packages/hill_station_tour" element={<Tour packageType="hill_station_tour" />} />
        <Route path="/packages/hill-station-tour" element={<Tour packageType="hill_station_tour" />} />
        
        <Route path="/packages/golden_triangle_tours" element={<Tour packageType="golden_triangle_tours" />} />
        <Route path="/packages/golden-triangle-tours" element={<Tour packageType="golden_triangle_tours" />} />
        
        <Route path="/packages/goa_tour" element={<Tour packageType="goa_tour" />} />
        <Route path="/packages/goa-tour" element={<Tour packageType="goa_tour" />} />
        
        <Route path="/packages/beach_tours_india" element={<Tour packageType="beach_tours_india" />} />
        <Route path="/packages/beach-tours-india" element={<Tour packageType="beach_tours_india" />} />
        
        {/* Routes for individual destinations */}
        <Route path="/packages/:packageType/destination/:destinationIndex" element={<TourDestination />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;