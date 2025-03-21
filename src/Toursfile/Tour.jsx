import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import { bookingService } from "../Backend/services/api.js";
import { guides } from '../Guide/Guide.jsx';
import './Tour.css';

// Directly import all package data files
import weekendToursData from '../data/Weekend_tour.json';
import summerholiday from '../data/summer_holiday_tour.json';
import keralatour from '../data/kerala_tour.json';
import hillStation from '../data/hill_station_tour.json';
import goldenTriangle from '../data/golden_triangle_tours.json';
import goatour from '../data/goa_tour.json';
import beachTour from '../data/beach_tours_india.json';

// Create a map of all available package data
const packageDataMap = {
  'weekend_tours': weekendToursData,
  'summer_holiday_tour': summerholiday,
  'kerala_tour': keralatour,
  'hill_station_tour': hillStation,
  'golden_triangle_tours': goldenTriangle,
  'goa_tour': goatour,
  'beach_tours_india': beachTour
};

const GuideSelection = ({ selectedPackage, onGuideSelect, onNoGuidesAvailable, onClose }) => {
  const [availableGuides, setAvailableGuides] = useState(guides); // Use guides data from Guide.jsx
 
  // Add availability property to all guides (for demo purposes, making most available)
  const guidesWithAvailability = guides.map((guide, index) => ({
    ...guide,
    available: index !== 2 // Make all guides available except the third one
  }));

  const handleSelectGuide = (guide) => {
    if (guide.available) {
      onGuideSelect(guide);
    } else {
      Swal.fire({
        title: 'Guide Not Available',
        text: 'This guide is currently not available. Please select another guide.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };

  const renderStars = (rating) => {
    // Implementation of star rating rendering
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="guide-selection-container">
      <div className="guide-selection-header">
        <h2 className="guide-selection-title">Select a Guide</h2>
        <button 
          onClick={onClose}
          className="close-button"
        >
          <span className="close-icon">×</span>
        </button>
      </div>
      
      <p className="guide-selection-description">
        Please select a guide who can assist you during your journey. Our guides are experts in their respective fields and will enhance your experience.
      </p>

      {guidesWithAvailability.filter(g => g.available).length === 0 ? (
        <div className="no-guides-container">
          <p className="no-guides-title">We currently don't have any guides available for your selected dates.</p>
          <p className="no-guides-subtitle">We'll notify you by email when a suitable guide becomes available.</p>
          <button 
            className="continue-without-guide-button"
            onClick={onNoGuidesAvailable}
          >
            Continue without guide
          </button>
        </div>
      ) : (
        <div className="guides-grid">
          {guidesWithAvailability.map(guide => (
            <div
              key={guide.id}
              className={`guide-card ${guide.available ? 'guide-available' : 'guide-unavailable'}`}
              onClick={() => guide.available && handleSelectGuide(guide)}
            >
              <div className="guide-image-container">
                {guide.image && (
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="guide-image"
                  />
                )}
                <div className={`availability-badge ${guide.available ? 'available' : 'unavailable'}`}>
                  {guide.available ? 'Available' : 'Unavailable'}
                </div>
              </div>
              
              <div className="guide-info">
                <h3 className="guide-name">{guide.name}</h3>
                <p className="guide-description">{guide.description}</p>
                
                {/* Languages */}
                <div className="guide-languages">
                  <p className="section-label">Languages</p>
                  <div className="tags-container">
                    {guide.languages.map((lang, index) => (
                      <span key={index} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="guide-specialties">
                  <p className="section-label">Specialties</p>
                  <div className="tags-container">
                    {guide.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Reviews summary */}
                {guide.reviews && guide.reviews.length > 0 && (
                  <div className="guide-reviews">
                    <div className="rating-container">
                      {renderStars(guide.reviews[0].rating)}
                      <span className="reviews-count">
                        ({guide.reviews.length} reviews)
                      </span>
                    </div>
                    <p className="review-text">
                      "{guide.reviews[0].text}"
                    </p>
                  </div>
                )}
                
                {guide.available && (
                  <button className="select-guide-button">
                    Select Guide
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="guide-selection-footer">
        <button 
          className="cancel-button"
          onClick={onClose}
        >
          Cancel
        </button>
        
        {guidesWithAvailability.filter(g => g.available).length > 0 && (
          <button 
            className="skip-guide-button"
            onClick={onNoGuidesAvailable}
          >
            Continue Without Guide
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentSuccessfully = () => {
  const location = useLocation();
  const { packageInfo, guideInfo, userDetails, totalAmount, bookingId } = location.state || {};
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have a bookingId, fetch the booking details from MongoDB
    const fetchBookingDetails = async () => {
      if (bookingId) {
        try {
          // This would be a new API endpoint you'd need to create
          const response = await axios.get(`/api/bookings/${bookingId}`);
          if (response.data) {
            setBookingDetails(response.data);
          }
        } catch (error) {
          console.error("Error fetching booking details:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If we don't have a bookingId, use the state data
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="payment-success loading">
        <div className="loading-spinner">Loading booking details...</div>
      </div>
    );
  }

  // Use either the fetched booking details or the state data
  const displayData = bookingDetails || {
    packageInfo,
    guideInfo,
    userDetails,
    totalAmount
  };

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

        {displayData.packageInfo ? (
          <div className="booking-details">
            <h2>Booking Details</h2>
            <p><strong>Package:</strong> {displayData.packageInfo.name}</p>
            <p><strong>Duration:</strong> {displayData.packageInfo.duration} days</p>
            <p><strong>Price:</strong> ₹{displayData.packageInfo.charge.toLocaleString()} per person</p>
            <p><strong>Total Amount:</strong> ₹{displayData.totalAmount.toLocaleString()}</p>
            
            {displayData.userDetails && (
              <div className="user-details">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {displayData.userDetails.name}</p>
                <p><strong>Email:</strong> {displayData.userDetails.email}</p>
                <p><strong>Phone:</strong> {displayData.userDetails.phone}</p>
                <p><strong>Number of Persons:</strong> {displayData.userDetails.persons}</p>
                <p><strong>Tour Date:</strong> {displayData.userDetails.date}</p>
              </div>
            )}

            {displayData.guideInfo && (
              <div className="guide-info">
                <h3>Your Special Assistance Guide</h3>
                <p><strong>Name:</strong> {displayData.guideInfo.name}</p>
                <p><strong>Languages:</strong> {displayData.guideInfo.languages.join(', ')}</p>
                <p><strong>Specialties:</strong> {displayData.guideInfo.specialties.join(', ')}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No booking details available. Please check your email for booking confirmation.</p>
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

// Payment form component with confirmation step - FULLY IMPLEMENTED
// Updated PaymentForm component
const PaymentForm = ({ selectedPackage, selectedGuide, onClose }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    persons: 1,
    date: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // You could check if user is logged in and fetch their info from MongoDB
    // This is just a placeholder for that functionality
    const fetchUserData = async () => {
      try {
        // Here we'd normally check if user is logged in via authentication
        // For now, we'll check if an email is stored in sessionStorage (temporary)
        const userEmail = sessionStorage.getItem('userEmail');
        
        if (userEmail) {
          // Fetch user data from MongoDB
          const userData = await bookingService.getUserByEmail(userEmail);
          
          if (userData) {
            setUserDetails(prevDetails => ({
              ...prevDetails,
              email: userData.email,
              name: userData.name,
              phone: userData.phone
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const handleConfirmDetails = () => {
    // Validate that all fields are filled before proceeding
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.date) {
      Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all required fields before proceeding.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Instead of using localStorage, we'll save the email to sessionStorage temporarily
    // In a real app, you'd use authentication and session management
    sessionStorage.setItem('userEmail', userDetails.email);

    setShowConfirmation(false); // Show payment form
  };

  const calculateTotalAmount = () => {
    return selectedPackage.charge * userDetails.persons;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data for MongoDB
    const requestData = {
      userDetails,
      paymentDetails: {
        cardName: paymentDetails.cardName,
        cardNumber: paymentDetails.cardNumber.slice(-4),
      },
      packageDetails: {
        name: selectedPackage.name,
        duration: selectedPackage.duration,
        charge: selectedPackage.charge,
      },
      guideDetails: selectedGuide
        ? {
            name: selectedGuide.name,
            specialties: selectedGuide.specialties,
            languages: selectedGuide.languages,
          }
        : null,
      totalAmount: calculateTotalAmount(),
    };

    try {
      // Save booking to MongoDB
      const booking = await bookingService.createBooking(requestData);
      
      setLoading(false);
      
      Swal.fire({
        title: "Payment Successful",
        text: "Your booking has been confirmed!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/payment-success", {
          state: {
            packageInfo: selectedPackage,
            guideInfo: selectedGuide,
            userDetails,
            totalAmount: calculateTotalAmount(),
            bookingId: booking._id // Pass the MongoDB booking ID
          },
        });
      });
    } catch (error) {
      setLoading(false);
      console.error("Error saving booking:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue processing your payment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="payment-form">
      {/* Rest of the component remains the same */}
      <div className="payment-header">
        <h2>{showConfirmation ? 'Confirm Booking Details' : 'Payment Information'}</h2>
        <button className="close-button" onClick={onClose}>
          <span className="close-icon">×</span>
        </button>
      </div>

      {showConfirmation ? (
        <>
          <div className="booking-summary">
            <h3>Package Summary</h3>
            <div className="summary-item">
              <span>Package:</span>
              <span>{selectedPackage.name}</span>
            </div>
            <div className="summary-item">
              <span>Duration:</span>
              <span>{selectedPackage.duration} days</span>
            </div>
            <div className="summary-item">
              <span>Price per person:</span>
              <span>₹{selectedPackage.charge.toLocaleString()}</span>
            </div>
            {selectedGuide && (
              <div className="summary-item">
                <span>Guide:</span>
                <span>{selectedGuide.name}</span>
              </div>
            )}
          </div>

          <form className="user-details-form">
            {/* Form fields remain the same */}
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="persons">Number of Persons*</label>
              <input
                type="number"
                id="persons"
                name="persons"
                min="1"
                value={userDetails.persons}
                onChange={handleInputChange}
                required
                placeholder="Enter number of travelers"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Tour Start Date*</label>
              <input
                type="date"
                id="date"
                name="date"
                value={userDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="continue-button" onClick={handleConfirmDetails}>
                Continue to Payment
              </button>
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="summary-item">
              <span>Package:</span>
              <span>{selectedPackage.name}</span>
            </div>
            <div className="summary-item">
              <span>Travelers:</span>
              <span>{userDetails.persons} person(s)</span>
            </div>
            <div className="summary-item">
              <span>Price per person:</span>
              <span>₹{selectedPackage.charge.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>₹{calculateTotalAmount().toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-details-form">
            {/* Payment form fields remain the same */}
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number*</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentInputChange}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name*</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handlePaymentInputChange}
                required
                placeholder="Enter name as on card"
              />
            </div>

            <div className="payment-row">
              <div className="form-group half">
                <label htmlFor="expiryDate">Expiry Date*</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentInputChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>

              <div className="form-group half">
                <label htmlFor="cvv">CVV*</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentInputChange}
                  required
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <div className="payment-methods">
              <div className="payment-icons">
                <span className="payment-icon visa">Visa</span>
                <span className="payment-icon mastercard">MasterCard</span>
                <span className="payment-icon amex">Amex</span>
                <span className="payment-icon rupay">RuPay</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="pay-button" disabled={loading}>
                {loading ? 'Processing...' : `Pay ₹${calculateTotalAmount().toLocaleString()}`}
              </button>
              <button type="button" className="back-button" onClick={() => setShowConfirmation(true)}>
                Back to Details
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
// Disability accommodations component
const DisabilityAccommodations = ({ selectedPackage, onContinue, onClose }) => {
  return (
    <div className="disability-accommodations">
      <h2>Disability Accommodations</h2>
      <p>We offer the following special arrangements for travelers with disabilities:</p>
      <ul>
        <li>Wheelchair accessible transportation</li>
        <li>Accessible hotel rooms</li>
        <li>Sign language interpreters (upon request)</li>
        <li>Modified itineraries for mobility concerns</li>
        <li>Assistance with special dietary requirements</li>
      </ul>
      <p>Our tour guides are specially trained to assist with specific needs.</p>
      <div className="form-actions">
        <button className="continue-button" onClick={onContinue}>Continue to Guide Selection</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

// Disability question popup
const DisabilityPopup = ({ selectedPackage, onClose, onYes, onNo }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Accessibility Information</h2>
        <p>Do you or anyone in your travel group have any disabilities or require special accommodations?</p>
        <div className="popup-actions">
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
          <button className="close-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Tour = ({ packageType: propPackageType, destinationIndex }) => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { packageType: paramPackageType } = useParams();
  const [showDisabilityPopup, setShowDisabilityPopup] = useState(false);
  const [showDisabilityAccommodations, setShowDisabilityAccommodations] = useState(false);
  const [showGuideSelection, setShowGuideSelection] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(false);

  // Use prop packageType if provided, otherwise use the URL parameter
  const packageType = propPackageType || paramPackageType || 'weekend_tours';

  useEffect(() => {
    const loadPackageData = () => {
      try {
        setLoading(true);

        // Get package data from our map
        const data = packageDataMap[packageType];

        if (data) {
          // Get the main data object (handle different JSON structures)
          const mainData = Object.values(data)[0] || data;
          setPackageData(mainData);

          // If destinationIndex is provided, set the selected destination
          if (destinationIndex !== undefined && mainData.destinations && mainData.destinations[destinationIndex]) {
            setSelectedDestination(mainData.destinations[destinationIndex]);
          } else {
            setSelectedDestination(null);
          }

          setLoading(false);
        } else {
          throw new Error(`Package type '${packageType}' not found`);
        }
      } catch (err) {
        console.error("Error loading package data:", err);
        setError(`Failed to load package data: ${err.message}`);
        setLoading(false);
      }
    };

    loadPackageData();
  }, [packageType, destinationIndex]);

  const handleBookNow = () => {
    setShowDisabilityPopup(true);
  };

  const handleDisabilityYes = () => {
    setShowDisabilityPopup(false);

    if (selectedGuide) {
      // If a guide is already selected, skip guide selection
      Swal.fire({
        title: 'Guide Already Selected',
        text: `${selectedGuide.name} has already been assigned to your trip.`,
        icon: 'info',
        confirmButtonText: 'Continue to Payment'
      }).then(() => {
        setShowPaymentForm(true);
      });
    } else {
      // If no guide is selected, proceed to guide selection
      setShowGuideSelection(true);
    }
    setShowDisabilityAccommodations(true);
  };

  const handleDisabilityNo = () => {
    setShowDisabilityPopup(false);
    if (selectedGuide) {
      // If a guide is already selected, skip guide selection
      Swal.fire({
        title: 'Guide Already Selected',
        text: `${selectedGuide.name} has already been assigned to your trip.`,
        icon: 'info',
        confirmButtonText: 'Continue to Payment'
      }).then(() => {
        setShowPaymentForm(true);
      });
    } else {
      // If no guide is selected, proceed to guide selection
      setShowGuideSelection(true);
    }
  };

  const handleContinueToGuideSelection = () => {
    setShowDisabilityAccommodations(false);
    setShowGuideSelection(true);
  };

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
    setShowGuideSelection(false);

    // Show sweet alert for guide confirmation
    Swal.fire({
      title: 'Guide Assigned',
      text: `${guide.name} has been assigned to your trip!`,
      icon: 'success',
      confirmButtonText: 'Continue to Payment'
    }).then((result) => {
      if (result.isConfirmed) {
        setShowPaymentForm(true);
      }
    });
  };

  const handleNoGuidesAvailable = () => {
    setShowGuideSelection(false);

    // Show notification toast
    Swal.fire({
      title: 'No Guide Selected',
      text: 'You will proceed without a guide. Our customer service team will be available for assistance during your trip.',
      icon: 'info',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    });

    // Redirect to payment form without a guide
    setShowPaymentForm(true);
  };

  const handleClosePopups = () => {
    setShowDisabilityPopup(false);
    setShowDisabilityAccommodations(false);
    setShowGuideSelection(false);
    setShowPaymentForm(false);
    setSelectedGuide(null);
  };

  if (loading) {
    return (
      <div className="package-container loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="package-container error">
        <h2>Error</h2>
        <p>{error || "Package not found"}</p>
      </div>
    );
  }

  // If we're showing a specific destination
  if (selectedDestination) {
    return (
      <div className="package-container">
        <div className="package-header">
          <h1>{selectedDestination.name || 'Destination Package'}</h1>
          <p className="package-subtitle">{packageData.subtitle || ''}</p>
          <Link to={`/packages/${packageType}`} className="back-button">Back to all {packageData.title} packages</Link>
        </div>

        {selectedDestination.image && (
          <div className="package-banner">
            <img src={selectedDestination.image} alt={selectedDestination.name} />
          </div>
        )}

        <div className="package-content">
          {selectedDestination.description && (
            <div className="package-description">
              <h2>Description</h2>
              <p>{selectedDestination.description}</p>
            </div>
          )}

          <div className="package-details">
            {selectedDestination.duration && (
              <div className="detail-item">
                <h3>Duration</h3>
                <p>{selectedDestination.duration} days</p>
              </div>
            )}

            {selectedDestination.charge && (
              <div className="detail-item">
                <h3>Price</h3>
                <p>₹{selectedDestination.charge.toLocaleString()} per person</p>
              </div>
            )}
          </div>

          {selectedDestination.dayWisePlan && selectedDestination.dayWisePlan.length > 0 && (
            <div className="package-itinerary">
              <h2>Day-wise Itinerary</h2>
              {selectedDestination.dayWisePlan.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <h3>Day {day.day}</h3>
                  <ul>
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="package-cta">
            <h2>Book This Package</h2>
            <p>Interested in this amazing destination? Contact us now to book your spot!</p>
            <button className="book-button" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>

        {/* Popups */}
        {showDisabilityPopup && (
        <DisabilityPopup
          onYes={handleDisabilityYes}
          onNo={handleDisabilityNo}
          onClose={() => setShowDisabilityPopup(false)}
        />
      )}

        {showDisabilityAccommodations && (
          <div className="popup-overlay">
            <div className="popup-content">
              <DisabilityAccommodations
                selectedPackage={selectedDestination}
                onContinue={handleContinueToGuideSelection}
                onClose={handleClosePopups}
              />
            </div>
          </div>
        )}

        {showGuideSelection && (
          <div className="popup-overlay">
            <div className="popup-content">
              <GuideSelection
                selectedPackage={selectedDestination}
                onGuideSelect={handleGuideSelect}
                onClose={() => setShowGuideSelection(false)}
              />
            </div>
          </div>
        )}

        {showPaymentForm && (
          <div className="popup-overlay">
            <div className="popup-content payment-popup">
              <PaymentForm
                selectedPackage={selectedDestination}
                selectedGuide={selectedGuide}
                onClose={() => setShowPaymentForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main package view with all destinations (no Book Now button at this level)
  return (
    <div className="package-container">
      <div className="package-header">
        <h1>{packageData.title || 'Tour Package'}</h1>
        <p className="package-subtitle">{packageData.subtitle || ''}</p>
      </div>

      {packageData.bannerImage && (
        <div className="package-banner">
          <img src={packageData.bannerImage} alt={packageData.title || 'Tour Package'} />
        </div>
      )}

      <div className="package-content">
        {packageData.description && (
          <div className="package-description">
            <h2>Description</h2>
            <p>{packageData.description}</p>
          </div>
        )}

        <div className="package-details">
          {packageData.duration && (
            <div className="detail-item">
              <h3>Duration</h3>
              <p>{packageData.duration}</p>
            </div>
          )}

          {packageData.price && (
            <div className="detail-item">
              <h3>Price</h3>
              <p>{packageData.price}</p>
            </div>
          )}

          {packageData.inclusions && packageData.inclusions.length > 0 && (
            <div className="detail-item">
              <h3>Inclusions</h3>
              <ul>
                {packageData.inclusions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              </div>
          )}
        </div>

        {packageData.destinations && packageData.destinations.length > 0 && (
          <div className="destinations-section">
            <h2>Destinations</h2>
            <div className="destinations-grid">
              {packageData.destinations.map((destination, index) => (
                <div key={index} className="destination-card">
                  {destination.image && (
                    <div className="destination-image">
                      <img src={destination.image} alt={destination.name} />
                    </div>
                  )}
                  <div className="destination-info">
                    <h3>{destination.name}</h3>
                    {destination.description && (
                      <p className="destination-description">{destination.description.substring(0, 100)}...</p>
                    )}
                    <div className="destination-details">
                      {destination.duration && (
                        <span className="duration-tag">{destination.duration} days</span>
                      )}
                      {destination.charge && (
                        <span className="price-tag">₹{destination.charge.toLocaleString()}</span>
                      )}
                    </div>
                    <Link 
                      to={`/packages/${packageType}/destination/${index}`} 
                      className="view-details-button"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {packageData.highlights && packageData.highlights.length > 0 && (
          <div className="highlights-section">
            <h2>Highlights</h2>
            <ul className="highlights-list">
              {packageData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}

        {packageData.faqs && packageData.faqs.length > 0 && (
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {packageData.faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Tour, PaymentSuccessfully, GuideSelection };