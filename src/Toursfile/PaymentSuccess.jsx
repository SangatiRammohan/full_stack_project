import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bookingService } from '../Backend/services/api';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { packageInfo, guideInfo, userDetails, totalAmount } = location.state || {};
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we don't have package info in the location state, redirect to home
    if (!packageInfo) {
      navigate('/');
      return;
    }

    // Save the booking to MongoDB
    const saveBooking = async () => {
      try {
        setLoading(true);
        
        // Create booking data object
        const bookingData = {
          packageInfo,
          guideInfo,
          userDetails,
          totalAmount
        };
        
        // Save to MongoDB
        const response = await bookingService.createBooking(bookingData);
        setBookingId(response._id);
        setLoading(false);
      } catch (err) {
        console.error('Error saving booking:', err);
        setError('Failed to save your booking. Please contact customer support.');
        setLoading(false);
        
        Swal.fire({
          title: 'Error',
          text: 'There was an error saving your booking. Please contact customer support with your transaction details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    saveBooking();
  }, [packageInfo, guideInfo, userDetails, totalAmount, navigate]);

  if (loading) {
    return (
      <div className="payment-success loading">
        <div className="loading-spinner">Finalizing your booking...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-success error">
        <h2>Error</h2>
        <p>{error}</p>
        <div className="action-buttons">
          <Link to="/" className="home-button">Return to Home</Link>
          <button onClick={() => window.location.reload()} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

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
        
        {bookingId && (
          <p className="booking-id">
            <strong>Booking ID:</strong> {bookingId}
          </p>
        )}

        {packageInfo && (
          <div className="booking-details">
            <h2>Booking Details</h2>
            <p><strong>Package:</strong> {packageInfo.name}</p>
            <p><strong>Duration:</strong> {packageInfo.duration} days</p>
            <p><strong>Price:</strong> ₹{packageInfo.charge.toLocaleString()} per person</p>
            
            {userDetails && (
              <div className="user-details">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Travel Date:</strong> {new Date(userDetails.date).toLocaleDateString()}</p>
                <p><strong>Number of Travelers:</strong> {userDetails.persons}</p>
                <p><strong>Total Amount Paid:</strong> ₹{totalAmount.toLocaleString()}</p>
              </div>
            )}
            
            {guideInfo && (
              <div className="guide-info">
                <h3>Your Special Assistance Guide</h3>
                <p><strong>Name:</strong> {guideInfo.name}</p>
                <p><strong>Specialization:</strong> {guideInfo.specialization}</p>
              </div>
            )}
          </div>
        )}

        <p>A confirmation email has been sent to {userDetails?.email || 'your registered email address'} with all the details.</p>
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