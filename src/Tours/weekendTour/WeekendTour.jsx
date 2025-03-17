import React, { useState } from 'react';
import './WeekendTour.css';

const WeekendTours = () => {
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

  const weekendToursData = {
    "weekend_tours": [
      {
        "id": 1,
        "name": "North India Weekend Tour",
        "introduction": "Experience the beauty of North India with a short yet enriching journey through Delhi, Rishikesh, and Mussoorie. Witness historical landmarks, spiritual hubs, and scenic landscapes.",
        "tour_plan": [
          "Day 1: Arrival in Delhi - Visit Red Fort, India Gate, Qutub Minar, and Chandni Chowk.",
          "Day 2: Travel to Rishikesh - Explore Lakshman Jhula, Triveni Ghat, and attend Ganga Aarti.",
          "Day 3: Drive to Mussoorie - Visit Kempty Falls, Gun Hill, and Mall Road.",
          "Day 4: Return to Delhi or Departure."
        ],
        "city_information": {
          "Delhi": "India's capital city, known for its rich history, bustling streets, and iconic monuments.",
          "Rishikesh": "The yoga capital of the world, famous for spiritual retreats and adventure sports.",
          "Mussoorie": "A scenic hill station known for colonial architecture and breathtaking views."
        },
        "highlights": [
          "Enjoy the spiritual atmosphere of Rishikesh.",
          "Explore the colonial charm of Mussoorie.",
          "Taste the famous street food of Delhi."
        ],
        "must_visit": [
          "Red Fort",
          "Lakshman Jhula",
          "Kempty Falls",
          "Gun Hill",
          "India Gate"
        ],
        "gallery": [
          "https://example.com/images/north1.jpg",
          "https://example.com/images/north2.jpg",
          "https://example.com/images/north3.jpg"
        ]
      },
      {
        "id": 2,
        "name": "South India Weekend Tour",
        "introduction": "A rejuvenating weekend getaway exploring the serene beauty of South India, covering Bangalore, Coorg, and Mysore.",
        "tour_plan": [
          "Day 1: Arrival in Bangalore - Visit Lalbagh Botanical Garden, Cubbon Park, and Bangalore Palace.",
          "Day 2: Travel to Coorg - Explore Abbey Falls, Dubare Elephant Camp, and coffee plantations.",
          "Day 3: Drive to Mysore - Visit Mysore Palace, Chamundi Hills, and Brindavan Gardens.",
          "Day 4: Return to Bangalore or Departure."
        ],
        "city_information": {
          "Bangalore": "The IT hub of India, known for its vibrant culture and pleasant climate.",
          "Coorg": "A beautiful hill station, famous for its coffee estates and waterfalls.",
          "Mysore": "A historic city known for its palaces, gardens, and silk sarees."
        },
        "highlights": [
          "Experience Coorg's lush coffee plantations.",
          "Admire the grandeur of Mysore Palace.",
          "Enjoy the nightlife and cafes of Bangalore."
        ],
        "must_visit": [
          "Bangalore Palace",
          "Abbey Falls",
          "Dubare Elephant Camp",
          "Mysore Palace",
          "Brindavan Gardens"
        ],
        "gallery": [
          "https://example.com/images/south1.jpg",
          "https://example.com/images/south2.jpg",
          "https://example.com/images/south3.jpg"
        ]
      },
      {
        "id": 3,
        "name": "East India Weekend Tour",
        "introduction": "A short but enriching journey through the cultural and natural wonders of East India, covering Kolkata, Darjeeling, and Gangtok.",
        "tour_plan": [
          "Day 1: Arrival in Kolkata - Visit Victoria Memorial, Howrah Bridge, and Dakshineswar Temple.",
          "Day 2: Travel to Darjeeling - Explore Tiger Hill, Batasia Loop, and Darjeeling Tea Gardens.",
          "Day 3: Drive to Gangtok - Visit Tsomgo Lake, Rumtek Monastery, and MG Marg.",
          "Day 4: Return to Kolkata or Departure."
        ],
        "city_information": {
          "Kolkata": "A city of intellectual and colonial heritage, known for its art, literature, and history.",
          "Darjeeling": "A hill station famous for its tea plantations and scenic views of the Himalayas.",
          "Gangtok": "The capital of Sikkim, offering breathtaking mountain views and Buddhist monasteries."
        },
        "highlights": [
          "Witness the sunrise over the Himalayas from Tiger Hill.",
          "Experience the charm of Darjeeling's tea estates.",
          "Explore the serene monasteries of Gangtok."
        ],
        "must_visit": [
          "Victoria Memorial",
          "Tiger Hill",
          "Darjeeling Tea Gardens",
          "Tsomgo Lake",
          "Rumtek Monastery"
        ],
        "gallery": [
          "https://example.com/images/east1.jpg",
          "https://example.com/images/east2.jpg",
          "https://example.com/images/east3.jpg"
        ]
      },
      {
        "id": 4,
        "name": "West India Weekend Tour",
        "introduction": "A delightful escape into the beauty of the Western Ghats, covering Mumbai, Lonavala, and Mahabaleshwar.",
        "tour_plan": [
          "Day 1: Arrival in Mumbai - Visit Gateway of India, Marine Drive, and Elephanta Caves.",
          "Day 2: Travel to Lonavala - Explore Bhushi Dam, Tiger's Leap, and Karla Caves.",
          "Day 3: Drive to Mahabaleshwar - Visit Venna Lake, Arthur's Seat, and Mapro Garden.",
          "Day 4: Return to Mumbai or Departure."
        ],
        "city_information": {
          "Mumbai": "The city of dreams, known for Bollywood, beaches, and colonial landmarks.",
          "Lonavala": "A beautiful hill station famous for waterfalls, caves, and lush greenery.",
          "Mahabaleshwar": "A scenic retreat with panoramic views and strawberry farms."
        },
        "highlights": [
          "Explore Mumbai's vibrant nightlife and street food.",
          "Enjoy the waterfalls and nature trails of Lonavala.",
          "Visit the strawberry farms of Mahabaleshwar."
        ],
        "must_visit": [
          "Gateway of India",
          "Bhushi Dam",
          "Tiger's Leap",
          "Venna Lake",
          "Arthur's Seat"
        ],
        "gallery": [
          "https://example.com/images/west1.jpg",
          "https://example.com/images/west2.jpg",
          "https://example.com/images/west3.jpg"
        ]
      },
      {
        "id": 5,
        "name": "Central India Weekend Tour",
        "introduction": "A journey through the heritage and wildlife of Central India, covering Bhopal, Sanchi, and Pachmarhi.",
        "tour_plan": [
          "Day 1: Arrival in Bhopal - Visit Taj-ul-Masjid, Upper Lake, and Tribal Museum.",
          "Day 2: Travel to Sanchi - Explore Sanchi Stupa and Udayagiri Caves.",
          "Day 3: Drive to Pachmarhi - Visit Bee Falls, Dhupgarh, and Jata Shankar Cave.",
          "Day 4: Return to Bhopal or Departure."
        ],
        "city_information": {
          "Bhopal": "The city of lakes, blending modernity with Mughal and tribal history.",
          "Sanchi": "A UNESCO World Heritage Site, known for its ancient Buddhist stupas.",
          "Pachmarhi": "A serene hill station with waterfalls and lush green forests."
        },
        "highlights": [
          "Explore the UNESCO-listed Sanchi Stupa.",
          "Enjoy the waterfalls and caves of Pachmarhi.",
          "Discover the heritage of Bhopal."
        ],
        "must_visit": [
          "Taj-ul-Masjid",
          "Sanchi Stupa",
          "Bee Falls",
          "Dhupgarh",
          "Upper Lake"
        ],
        "gallery": [
          "https://example.com/images/central1.jpg",
          "https://example.com/images/central2.jpg",
          "https://example.com/images/central3.jpg"
        ]
      }
    ]
  };

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
    const tour = weekendToursData.weekend_tours.find(tour => tour.id === tourId);
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
    <div className="weekend-tours-container">
      {!selectedTour ? (
        <>
          <div className="weekend-tours-header">
            <h1>Enjoy Perfect Weekend Getaways</h1>
            <p>Escape the everyday with our handcrafted weekend tours. Experience memorable adventures packed into short breaks, offering the perfect balance of exploration, relaxation, and cultural immersion.</p>
          </div>
          
          <div className="tour-cards-container">
            {weekendToursData.weekend_tours.map((tour) => (
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
            &larr; Back to Weekend Tours
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
                <h2>Book This Weekend Tour</h2>
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
                  
                  <div className="form-group">
                    <label htmlFor="adults">Number of Adults</label>
                    <input 
                      type="number" 
                      id="adults" 
                      name="adults" 
                      min="1" 
                      value={formData.adults} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="children">Number of Children</label>
                    <input 
                      type="number" 
                      id="children" 
                      name="children" 
                      min="0" 
                      value={formData.children} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Special Requests</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows="4"
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="booking-submit-button">
                    Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekendTours;