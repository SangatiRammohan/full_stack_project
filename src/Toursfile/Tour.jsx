import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

// Mock guide data (this would come from your backend in a real application)
const availableGuides = [
  { id: 1, name: "Rajesh Kumar", specialization: "Mobility assistance", available: true },
  { id: 2, name: "Priya Singh", specialization: "Sign language", available: true },
  { id: 3, name: "Arun Sharma", specialization: "Visual impairment assistance", available: false },
  { id: 4, name: "Meera Patel", specialization: "General assistance", available: true }
];

// Guide selection component
const GuideSelection = ({ selectedPackage, onGuideSelect, onClose }) => {
  const [guides, setGuides] = useState(availableGuides);
  
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

  return (
    <div className="guide-selection">
      <h2>Select a Special Assistance Guide</h2>
      <p>Please select a guide who can assist with your specific needs:</p>
      
      {guides.filter(g => g.available).length === 0 ? (
        <div className="no-guides">
          <p>We currently don't have any guides available for your selected dates.</p>
          <p>We'll notify you by email when a suitable guide becomes available.</p>
        </div>
      ) : (
        <div className="guides-list">
          {guides.map(guide => (
            <div 
              key={guide.id} 
              className={`guide-card ${guide.available ? 'available' : 'unavailable'}`}
              onClick={() => handleSelectGuide(guide)}
            >
              <h3>{guide.name}</h3>
              <p className="specialization">Specialization: {guide.specialization}</p>
              <p className="status">
                Status: {guide.available ? 'Available' : 'Not Available'}
              </p>
              {guide.available && <button className="select-button">Select</button>}
            </div>
          ))}
        </div>
      )}
      
      <div className="form-actions">
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

// Payment form component
const PaymentForm = ({ selectedPackage, selectedGuide, onClose }) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For now, we'll just redirect to a thank you page
    navigate('/payment-success', { 
      state: { 
        packageInfo: selectedPackage,
        guideInfo: selectedGuide 
      } 
    });
  };
  
  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Package: {selectedPackage.name}</label>
        </div>
        <div className="form-group">
          <label>Duration: {selectedPackage.duration} days</label>
        </div>
        <div className="form-group">
          <label>Price: ₹{selectedPackage.charge.toLocaleString()} per person</label>
        </div>
        {selectedGuide && (
          <div className="form-group">
            <label>Special Assistance Guide: {selectedGuide.name}</label>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" required />
        </div>
        <div className="form-group">
          <label htmlFor="persons">Number of Persons</label>
          <input type="number" id="persons" min="1" defaultValue="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Travel Date</label>
          <input type="date" id="date" required />
        </div>
        <div className="form-actions">
          <button type="submit" className="pay-button">Proceed to Payment</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
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
  const [selectedGuide, setSelectedGuide] = useState(null);
  
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
    setShowDisabilityAccommodations(true);
  };

  const handleDisabilityNo = () => {
    setShowDisabilityPopup(false);
    setShowPaymentForm(true);
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
      title: 'No Guides Available',
      text: 'We currently don\'t have guides available for your selected dates. We\'ll notify you by email when a suitable guide becomes available.',
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
            selectedPackage={selectedDestination}
            onClose={handleClosePopups}
            onYes={handleDisabilityYes}
            onNo={handleDisabilityNo}
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
                onNoGuidesAvailable={handleNoGuidesAvailable}
                onClose={handleClosePopups}
              />
            </div>
          </div>
        )}

        {showPaymentForm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <PaymentForm
                selectedPackage={selectedDestination}
                selectedGuide={selectedGuide}
                onClose={handleClosePopups}
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
        
        {packageData.itinerary && packageData.itinerary.length > 0 && (
          <div className="package-itinerary">
            <h2>General Itinerary</h2>
            {packageData.itinerary.map((day, index) => (
              <div key={index} className="itinerary-day">
                <h3>Day {day.day}</h3>
                <h4>{day.title}</h4>
                <p>{day.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {packageData.highlights && packageData.highlights.length > 0 && (
          <div className="package-highlights">
            <h2>Highlights</h2>
            <ul>
              {packageData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        
        {packageData.accommodations && packageData.accommodations.length > 0 && (
          <div className="package-accommodations">
            <h2>Accommodations</h2>
            <ul>
              {packageData.accommodations.map((accommodation, index) => (
                <li key={index}>
                  <h4>{accommodation.name}</h4>
                  <p>{accommodation.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Destinations section */}
        {packageData.destinations && packageData.destinations.length > 0 && (
          <div className="package-destinations">
            <h2>Available Tour Packages</h2>
            <div className="destinations-grid">
              {packageData.destinations.map((destination, index) => (
                <div key={index} className="destination-card">
                  {destination.image && (
                    <img src={destination.image} alt={destination.name} />
                  )}
                  <div className="destination-info">
                    <h3>{destination.name}</h3>
                    <p>{destination.description.substring(0, 150)}...</p>
                    <div className="destination-details">
                      <span>Duration: {destination.duration} days</span>
                      <span>Price: ₹{destination.charge.toLocaleString()}</span>
                    </div>
                    <Link to={`/packages/${packageType}/destination/${index}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {packageData.gallery && packageData.gallery.length > 0 && (
          <div className="package-gallery">
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {packageData.gallery.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img src={image} alt={`Gallery image ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tour;