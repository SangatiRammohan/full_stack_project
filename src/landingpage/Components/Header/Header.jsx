import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../../public/HeaderAssests/logo.png';

const Header = ({ setActiveComponent }) => {
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
  
  const handleNavigation = (component, e) => {
    e.preventDefault();
    setActiveComponent(component);
    setIsMenuOpen(false);
    window.scrollTo(0, 0); // Scroll to top when navigating
  };

  // Map package options to their corresponding component names
  const packageOptions = [
    { display: 'Weekend Tours', component: 'WeekendTour' },
    { display: 'Hill Station Tours', component: 'Package_HillStationTours' },
    { display: 'Goa Tour', component: 'Package_GoaTour' },
    { display: 'Kerala Tour', component: 'Package_KeralaTour' },
    { display: 'Golden Triangular Tours', component: 'Package_GoldenTriangularTours' },
    { display: 'Summer Holiday Tour', component: 'Package_SummerHolidayTour' },
    { display: 'Beach Vacation Tours', component: 'Package_BeachVacationTours' }
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          {/* Logo - clicking on logo returns to Home */}
          <div className="logo" onClick={(e) => handleNavigation('Home', e)} style={{ cursor: 'pointer' }}>
            <img src={logo} alt="OpticView Logo" />
            <span className="logo-text">OpticView</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          
          {/* Navigation */}
          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#" onClick={(e) => handleNavigation('Home', e)}>Home</a></li>
              <li><a href="#" onClick={(e) => handleNavigation('About', e)}>About Us</a></li>
              <li><a href="#" onClick={(e) => handleNavigation('Guide', e)}>Guide</a></li>
              <li className={`dropdown ${activeDropdown === 3 ? 'active' : ''}`}>
                <a
                  href="#"
                  className="dropdown-trigger"
                  onClick={(e) => toggleDropdown(3, e)}
                >
                  Packages
                </a>
                <div className="dropdown-content">
                  {packageOptions.map((option, index) => (
                    <a key={index} href="#" onClick={(e) => handleNavigation(option.component, e)}>
                      {option.display}
                    </a>
                  ))}
                </div>
              </li>
              <li><a href="#" onClick={(e) => handleNavigation('Testimonials', e)}>Testimonials</a></li>
              <li><a href="#" onClick={(e) => handleNavigation('Contact', e)}>Contact</a></li>
            </ul>
            
            {/* Mobile-only sign buttons */}
            <div className="mobile-sign-buttons">
              <button className="sign-button" onClick={(e) => handleNavigation('SignUp', e)}>Sign Up</button>
              <button className="sign-button" onClick={(e) => handleNavigation('SignIn', e)}>Sign In</button>
            </div>
          </nav>
          
          {/* Desktop-only sign buttons */}
          <div className="desktop-sign-buttons">
            <button className="sign-button" onClick={(e) => handleNavigation('SignUp', e)}>Sign Up</button>
            <button className="sign-button" onClick={(e) => handleNavigation('SignIn', e)}>Sign In</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;