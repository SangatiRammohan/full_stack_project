import React from 'react'
import Header from './Components/Header/Header'
import Hero from './Components/Herosection/Hero'
import City from './Components/Popular/City'
import AboutPage from './Components/Aboutus/About'
import { useRef } from 'react'
import VideoHero from './Components/Bgvideo/VideoHero'
import TripBookingProcess from './Components/Process/TripBookingProcess'
import Testimonials from './Components/Testimonials/Testimonials'
import SubscribeSection from './Components/Subscribe/SubscribeSection'
import FlexSection from './Components/LearnMore/BackgroundSection'
import ContactSection from './Components/Contact/ContactSection'
import Footer from './Components/Footer/Footer'
// import Packages from './Components/Packages/Packages'


const App = () => {
  const aboutRef = useRef(null);
  return (
    <>

<Header aboutRef={aboutRef} />
   {/* <Header/> */}
   <Hero/>
   <City/>
   <AboutPage ref={aboutRef} />
   <VideoHero />
   <TripBookingProcess/>
   <Testimonials />
   <FlexSection />
   <SubscribeSection />
   <ContactSection />
   <Footer />
  

   
  

    </>
  )
}

export default App
