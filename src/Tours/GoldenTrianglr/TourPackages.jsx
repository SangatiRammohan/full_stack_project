import React, { useState } from 'react';
import './TourPackages.css';

const TourPackages = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    adults: 1,
    children: 0,
    message: ''
  });

  const tourData = [
    {
      "id": 1,
      "name": "Rajasthan Golden Triangle",
      "introduction": "The Rajasthan Golden Triangle Tour covers Delhi, Agra, and Jaipur, showcasing India's royal heritage, Mughal architecture, and vibrant culture. This journey explores grand forts, majestic palaces, and historical monuments.",
      "tour_plan": [
        "Day 1: Arrival in Delhi - Visit Red Fort, India Gate, Qutub Minar, and Lotus Temple.",
        "Day 2: Travel to Agra - Explore Taj Mahal, Agra Fort, and Mehtab Bagh.",
        "Day 3: Drive to Jaipur - Visit Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar.",
        "Day 4: Jaipur Sightseeing - Explore Nahargarh Fort and Albert Hall Museum.",
        "Day 5: Return to Delhi or Departure."
      ],
      "city_information": {
        "Delhi": "Capital of India, known for its Mughal-era landmarks, bustling markets, and street food.",
        "Agra": "Famous for the Taj Mahal, Agra Fort, and Fatehpur Sikri, showcasing rich Mughal history.",
        "Jaipur": "The Pink City, known for its Rajput palaces, historic forts, and vibrant bazaars."
      },
      "highlights": [
        "Marvel at the beauty of the Taj Mahal during sunrise.",
        "Explore the majestic Amber Fort in Jaipur.",
        "Experience local markets and traditional Rajasthani cuisine."
      ],
      "must_visit": [
        "Red Fort",
        "Taj Mahal",
        "Amber Fort",
        "Hawa Mahal",
        "City Palace"
      ],
      "gallery": [
        "https://example.com/images/rajasthan1.jpg",
        "https://example.com/images/rajasthan2.jpg",
        "https://example.com/images/rajasthan3.jpg"
      ]
    },
    {
      "id": 2,
      "name": "South Indian Golden Triangle",
      "introduction": "The South Indian Golden Triangle Tour takes you through Chennai, Mahabalipuram, and Pondicherry, showcasing the blend of Dravidian temple architecture, French colonial history, and coastal beauty.",
      "tour_plan": [
        "Day 1: Arrival in Chennai - Visit Marina Beach, Kapaleeshwarar Temple, and Fort St. George.",
        "Day 2: Travel to Mahabalipuram - Explore Shore Temple, Arjuna's Penance, and Five Rathas.",
        "Day 3: Drive to Pondicherry - Explore Auroville, French Quarters, and Paradise Beach.",
        "Day 4: Return to Chennai or Departure."
      ],
      "city_information": {
        "Chennai": "A cultural hub known for temples, beaches, and colonial history.",
        "Mahabalipuram": "UNESCO-listed rock-cut temples with a rich historical background.",
        "Pondicherry": "A charming coastal town with French influence and serene beaches."
      },
      "highlights": [
        "Explore the ancient rock-cut temples of Mahabalipuram.",
        "Relax on the scenic beaches of Pondicherry.",
        "Experience the fusion of Tamil and French cultures."
      ],
      "must_visit": [
        "Kapaleeshwarar Temple",
        "Shore Temple",
        "Auroville",
        "French Quarters",
        "Paradise Beach"
      ],
      "gallery": [
        "https://example.com/images/south1.jpg",
        "https://example.com/images/south2.jpg",
        "https://example.com/images/south3.jpg"
      ]
    },
    {
        "id": 3,
        "name": "West Indian Golden Triangle",
        "introduction": "A scenic and cultural journey through Mumbai, Goa, and Pune, featuring vibrant nightlife, Portuguese heritage, and historical sites.",
        "tour_plan": [
          "Day 1: Arrival in Mumbai - Visit Gateway of India, Marine Drive, and Elephanta Caves.",
          "Day 2: Travel to Goa - Explore Baga Beach, Basilica of Bom Jesus, and Aguada Fort.",
          "Day 3: Drive to Pune - Visit Shaniwar Wada, Aga Khan Palace, and Dagdusheth Temple.",
          "Day 4: Return to Mumbai or Departure."
        ],
        "city_information": {
          "Mumbai": "The financial capital of India, known for Bollywood and colonial-era landmarks.",
          "Goa": "A former Portuguese colony famous for beaches, nightlife, and churches.",
          "Pune": "A cultural and educational hub with a mix of heritage and modern attractions."
        },
        "highlights": [
          "Enjoy Mumbai's vibrant nightlife and street food.",
          "Relax on the serene beaches of Goa.",
          "Explore Pune’s historical forts and temples."
        ],
        "must_visit": [
          "Gateway of India",
          "Basilica of Bom Jesus",
          "Baga Beach",
          "Shaniwar Wada",
          "Aga Khan Palace"
        ],
        "gallery": [
          "https://example.com/images/west1.jpg",
          "https://example.com/images/west2.jpg",
          "https://example.com/images/west3.jpg"
        ]
      },
      {
        "id": 4,
        "name": "East Indian Golden Triangle",
        "introduction": "This journey explores the cultural richness of Kolkata, Bhubaneswar, and Puri, featuring colonial architecture, Hindu temples, and spiritual landmarks.",
        "tour_plan": [
          "Day 1: Arrival in Kolkata - Visit Victoria Memorial, Howrah Bridge, and Dakshineswar Temple.",
          "Day 2: Travel to Bhubaneswar - Explore Lingaraj Temple, Udayagiri Caves, and Rajarani Temple.",
          "Day 3: Drive to Puri - Visit Jagannath Temple, Konark Sun Temple, and Puri Beach.",
          "Day 4: Return to Bhubaneswar or Departure."
        ],
        "city_information": {
          "Kolkata": "A historical city known for its colonial architecture and literary heritage.",
          "Bhubaneswar": "Famous for its ancient temples and Odisha’s cultural significance.",
          "Puri": "A prominent pilgrimage site known for the Jagannath Temple and pristine beaches."
        },
        "highlights": [
          "Explore the colonial charm of Kolkata.",
          "Visit the famous Jagannath Temple in Puri.",
          "Marvel at the architecture of the Sun Temple in Konark."
        ],
        "must_visit": [
          "Victoria Memorial",
          "Howrah Bridge",
          "Lingaraj Temple",
          "Jagannath Temple",
          "Konark Sun Temple"
        ],
        "gallery": [
          "https://example.com/images/east1.jpg",
          "https://example.com/images/east2.jpg",
          "https://example.com/images/east3.jpg"
        ]
      }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    alert("Booking request submitted successfully!");
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      adults: 1,
      children: 0,
      message: ''
    });
  };

  const viewTourDetails = (tourId) => {
    const tour = tourData.find(tour => tour.id === tourId);
    setSelectedTour(tour);
    window.scrollTo(0, 0);
  };

  const closeDetails = () => {
    setSelectedTour(null);
  };

  // Placeholder images for gallery since the actual URLs are just examples
  const placeholderImages = [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ];

  return (
    <div className="tour-packages-container">
      {!selectedTour ? (
        <>
          <div className="tour-packages-header">
            <h1>Discover Our Golden Triangle Tours</h1>
            <p>Embark on a journey through India's most iconic destinations with our meticulously crafted Golden Triangle tours. Experience the perfect blend of historical monuments, cultural heritage, and natural beauty.</p>
          </div>
          
          <div className="tour-cards-container">
            {tourData.map((tour) => (
              <div className="tour-card" key={tour.id}>
                <div className="tour-card-image">
                  <img src="/api/placeholder/400/250" alt={tour.name} />
                </div>
                <div className="tour-card-content">
                  <h2>{tour.name}</h2>
                  <p>{tour.introduction.substring(0, 150)}...</p>
                  <div className="tour-highlights">
                    <h3>Highlights:</h3>
                    <ul>
                      {tour.highlights.slice(0, 2).map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className="view-details-button"
                    onClick={() => viewTourDetails(tour.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="tour-details-container">
          <button className="back-button" onClick={closeDetails}>
            &larr; Back to Tours
          </button>
          
          <h1>{selectedTour.name}</h1>
          
          <div className="tour-details-content">
            <div className="tour-details-left">
              <div className="tour-image">
                <img src="/api/placeholder/600/400" alt={selectedTour.name} />
              </div>
              
              <div className="tour-section">
                <h2>Introduction</h2>
                <p>{selectedTour.introduction}</p>
              </div>
              
              <div className="tour-section">
                <h2>Tour Plan</h2>
                <ul className="tour-plan-list">
                  {selectedTour.tour_plan.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h2>City Information</h2>
                {Object.entries(selectedTour.city_information).map(([city, info]) => (
                  <div className="city-info" key={city}>
                    <h3>{city}</h3>
                    <p>{info}</p>
                  </div>
                ))}
              </div>
              
              <div className="tour-section">
                <h2>Highlights</h2>
                <ul>
                  {selectedTour.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h2>Must Visit</h2>
                <ul className="must-visit-list">
                  {selectedTour.must_visit.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h2>Gallery</h2>
                <div className="gallery-container">
                  {placeholderImages.map((img, index) => (
                    <div className="gallery-item" key={index}>
                      <img src={img} alt={`${selectedTour.name} - ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="tour-details-right">
              <div className="booking-form-container">
                <h2>Book This Tour</h2>
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group half">
                      <label htmlFor="adults">Adults</label>
                      <input 
                        type="number" 
                        id="adults" 
                        name="adults" 
                        value={formData.adults} 
                        onChange={handleInputChange} 
                        min="1" 
                        required 
                      />
                    </div>
                    
                    <div className="form-group half">
                      <label htmlFor="children">Children</label>
                      <input 
                        type="number" 
                        id="children" 
                        name="children" 
                        value={formData.children} 
                        onChange={handleInputChange} 
                        min="0" 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Special Requests</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      value={formData.message} 
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="book-now-button">Book Now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackages;