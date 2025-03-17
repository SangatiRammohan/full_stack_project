import React, { useState, useRef } from 'react';
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

const App = () => {
  const [activeComponent, setActiveComponent] = useState('Home');
  const homeRef = useRef(null);

  // Function to return to home view
  const returnToHome = () => {
    setActiveComponent('Home');
    // Scroll to top when returning to home
    window.scrollTo(0, 0);
  };

  // Render specific component or all components for home page
  const renderContent = () => {
    switch (activeComponent) {
      case 'About':
        return (
          <div className="single-component-view">
            <AboutPage />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
      case 'Guide':
        return (
          <div className="single-component-view">
            <Guide />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
      case 'Testimonials':
        return (
          <div className="single-component-view">
            <Testimonials />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
      case 'Contact':
        return (
          <div className="single-component-view">
            <ContactSection />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
      case 'WeekendTour':
        return (
          <div className="single-component-view">
            <WeekendTours />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
        case 'Package_GoldenTriangularTours':
        return (
          <div className="single-component-view">
            <TourPackages />
            <button className="return-home-btn" onClick={returnToHome}>
              Return to Home
            </button>
          </div>
        );
        case 'Package_HillStationTours':
          return (
            <div className="single-component-view">
             <HillStation/>
              <button className="return-home-btn" onClick={returnToHome}>
                Return to Home
              </button>
            </div>
          );
          // case 'Package_GoaTour':
          //   return (
          //     <div className="single-component-view">
          //      <Goa/>
          //       <button className="return-home-btn" onClick={returnToHome}>
          //         Return to Home
          //       </button>
          //     </div>
          //   );
      case 'Home':
        return (
          <div className="home-view" ref={homeRef}>
            <Hero />
            <City />
            <AboutPage />
            <Process />
            <VideoHero />
            <Packages />
            <Testimonials />
            <SubscribeSection />
            <ContactSection />
          </div>
        );
      default:
        if (activeComponent.startsWith('Package_')) {
          const packageName = activeComponent.replace('Package_', '');
          return (
            <div className="single-component-view">
              <Packages filter={packageName} />
              <button className="return-home-btn" onClick={returnToHome}>
                Return to Home
              </button>
            </div>
          );
        }
        // Fallback to home view
        return (
          <div className="home-view" ref={homeRef}>
            <Hero />
            <City />
            <AboutPage />
            <Process />
            <VideoHero />
            <Packages />
            <Testimonials />
            <SubscribeSection />
            <ContactSection />
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Header setActiveComponent={setActiveComponent} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;