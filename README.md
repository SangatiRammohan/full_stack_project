cityPluse 
processing.....!


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

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const aboutRef = useRef(null);

  // Function to render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'guide':
        return <Guide />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <City />
            <AboutPage />
            <Testimonials />
            <Process />
            <VideoHero />
            <Packages />
            <SubscribeSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </>
  );
};

export default App;
































import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../../public/HeaderAssests/logo.png'; // Adjust path if needed

const Header = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = (index, e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const packageOptions = [
    'Weekend Tours',
    'Hill Station Tours',
    'Goa Tour',
    'Kerala Tour',
    'Golden Triangular Tours',
    'Summer Holiday Tour',
    'Beach Vacation Tours'
  ];

  // Handle navigation with state
  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <a href="/" onClick={(e) => handleNavClick('home', e)}>
              <img src={logo} alt="OpticView Logo" />
              <span>OpticView</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          
          {/* Navigation */}
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="/" onClick={(e) => handleNavClick('home', e)}>Home</a>
              </li>
              <li className="nav-item">
                <a href="/about" onClick={(e) => handleNavClick('about', e)}>About Us</a>
              </li>
              <li className="nav-item">
                <a href="/guide" onClick={(e) => handleNavClick('guide', e)}>Guide</a>
              </li>
              <li className="nav-item has-dropdown">
                <a 
                  href="/packages" 
                  onClick={(e) => toggleDropdown(3, e)}
                >
                  Packages
                  {activeDropdown === 3 && <span className="dropdown-arrow">▼</span>}
                </a>
                {activeDropdown === 3 && (
                  <ul className="dropdown-menu">
                    {packageOptions.map((option, index) => (
                      <li key={index}>
                        <a 
                          href={`/packages/${option.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMenuOpen(false);
                          }}
                        >
                          {option}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="nav-item">
                <a href="/testimonials" onClick={(e) => handleNavClick('testimonials', e)}>
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" onClick={(e) => handleNavClick('contact', e)}>Contact</a>
              </li>
            </ul>
            
            {/* Mobile-only sign buttons */}
            <div className="mobile-sign-buttons">
              <button className="sign-up-btn">Sign Up</button>
              <button className="sign-in-btn">Sign In</button>
            </div>
          </nav>
          
          {/* Desktop-only sign buttons */}
          <div className="desktop-sign-buttons">
            <button className="sign-up-btn">Sign Up</button>
            <button className="sign-in-btn">Sign In</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;