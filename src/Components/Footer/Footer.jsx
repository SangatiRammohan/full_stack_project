import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Tours', path: '/tours' },
    { title: 'Contact', path: '/contact' }
  ];

  const tourTypes = [
    'City Tours',
    'Historical Tours',
    'Cultural Experiences',
    'Adventure Trips',
    'Weekend Getaways'
  ];

  const instagramPhotos = [
    '/api/placeholder/300/300',
    '/api/placeholder/300/300',
    '/api/placeholder/300/300',
    '/api/placeholder/300/300',
    '/api/placeholder/300/300',
    '/api/placeholder/300/300'
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <div className="footer-logo">
            <img 
              src="/api/placeholder/150/50" 
              alt="Company Logo" 
              className="logo-image" 
            />
            <p className="logo-tagline">Explore the World with Us</p>
          </div>
        </div>

        <div className="footer-section navigation-section">
          <h4>Quick Links</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.title}>
                <a href={link.path}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section tours-section">
          <h4>Our Tours</h4>
          <ul>
            {tourTypes.map((tour) => (
              <li key={tour}>
                <a href="#">{tour}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section instagram-section">
          <h4>Instagram Photos</h4>
          <div className="instagram-grid">
            {instagramPhotos.map((photo, index) => (
              <div key={index} className="instagram-photo">
                <img src={photo} alt={`Instagram photo ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-media">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedin /></a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Travel Company. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;