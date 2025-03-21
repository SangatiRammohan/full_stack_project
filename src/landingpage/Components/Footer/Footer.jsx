import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Tours', path: '/packages' }, // Updated path to navigate to the Packages component
    { title: 'Contact', path: '/contact' }
  ];

  const tourTypes = [
    { title: 'Weekend Tours', path: '/packages/weekend_tours' },
    { title: 'Hill Station Tours', path: '/packages/hill_station_tour' },
    { title: 'Goa Tour', path: '/packages/goa_tour' },
    { title: 'Kerala Tour', path: '/packages/kerala_tour' },
    { title: 'Golden Triangular Tours', path: '/packages/golden_triangle_tours' },
    { title: 'Summer Holiday Tour', path: '/packages/summer_holiday_tour' },
    { title: 'Beach Vacation Tours', path: '/packages/beach_tours_india' }
  ];

  const instagramPhotos = [
    "../../../../public/Footer/img1.jpg",
    "../../../../public/Footer/img2.jpg",
    "../../../../public/Footer/img3.jpg",
    "../../../../public/Footer/pic1.jpeg",
    "../../../../public/Footer/pic2.jpeg",
    "../../../../public/Footer/pic3.webp"
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
                <Link to={link.path}>{link.title}</Link> {/* Use Link for navigation */}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section tours-section">
          <h4>Our Tours</h4>
          <ul>
            {tourTypes.map((tour) => (
              <li key={tour.title}>
                <Link to={tour.path}>{tour.title}</Link> {/* Use Link for navigation */}
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