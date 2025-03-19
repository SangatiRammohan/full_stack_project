import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { packageInfo, guideInfo } = location.state || {};

  return (
    <div className="payment-success">
      <div className="success-container">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for booking with us. Your tour package is confirmed.</p>
        
        {packageInfo && (
          <div className="booking-details">
            <h2>Booking Details</h2>
            <p><strong>Package:</strong> {packageInfo.name}</p>
            <p><strong>Duration:</strong> {packageInfo.duration} days</p>
            <p><strong>Price:</strong> ₹{packageInfo.charge.toLocaleString()} per person</p>
            
            {guideInfo && (
              <div className="guide-info">
                <h3>Your Special Assistance Guide</h3>
                <p><strong>Name:</strong> {guideInfo.name}</p>
                <p><strong>Specialization:</strong> {guideInfo.specialization}</p>
              </div>
            )}
          </div>
        )}
        
        <p>A confirmation email has been sent to your registered email address with all the details.</p>
        <p>If you have any questions, please contact our customer support.</p>
        
        <div className="action-buttons">
          <Link to="/" className="home-button">Return to Home</Link>
          <Link to="/my-bookings" className="bookings-button">View My Bookings</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;