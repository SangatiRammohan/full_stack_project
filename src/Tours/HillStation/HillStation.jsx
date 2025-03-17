import React, { useState } from 'react';
import './HillStation.css'; // You'll need to create this CSS file

const HillStation = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    adults: 1,
    children: 0,
    specialRequests: ''
  });

  // Sample data from your JSON
  const hillStationData = {
    "hill_station_tours": [
      {
        "id": 1,
        "name": "North India Hill Station Tour",
        "introduction": "Explore the mesmerizing hill stations of North India, covering Shimla, Manali, and Dharamshala. Witness snow-capped mountains, lush valleys, and adventure activities.",
        "tour_plan": [
          "Day 1: Arrival in Shimla - Visit Mall Road, Christ Church, and Kufri.",
          "Day 2: Travel to Manali - Explore Hadimba Temple, Solang Valley, and Manu Temple.",
          "Day 3: Drive to Dharamshala - Visit Dalai Lama Temple, Bhagsu Waterfall, and McLeod Ganj.",
          "Day 4: Return to Delhi or Departure."
        ],
        "city_information": {
          "Shimla": "The Queen of Hills, known for colonial architecture and scenic landscapes.",
          "Manali": "A paradise for adventure lovers with beautiful valleys and snow-capped peaks.",
          "Dharamshala": "A serene town known for Tibetan culture and stunning monasteries."
        },
        "highlights": [
          "Enjoy the snowfall and adventure sports in Solang Valley.",
          "Explore the Tibetan monasteries and local culture in Dharamshala.",
          "Experience the colonial charm of Shimla."
        ],
        "must_visit": [
          "Mall Road",
          "Hadimba Temple",
          "Solang Valley",
          "Dalai Lama Temple",
          "Bhagsu Waterfall"
        ],
        "gallery": [
          "https://example.com/images/north_hill1.jpg",
          "https://example.com/images/north_hill2.jpg",
          "https://example.com/images/north_hill3.jpg"
        ]
      },
      {
        "id": 2,
        "name": "South India Hill Station Tour",
        "introduction": "Escape to the lush green hills of South India with this tour covering Ooty, Munnar, and Kodaikanal. Enjoy tea plantations, waterfalls, and cool weather.",
        "tour_plan": [
          "Day 1: Arrival in Ooty - Visit Botanical Gardens, Ooty Lake, and Doddabetta Peak.",
          "Day 2: Travel to Munnar - Explore Tea Gardens, Eravikulam National Park, and Mattupetty Dam.",
          "Day 3: Drive to Kodaikanal - Visit Coaker's Walk, Pillar Rocks, and Bryant Park.",
          "Day 4: Return to Coimbatore or Departure."
        ],
        "city_information": {
          "Ooty": "A popular hill station known for its picturesque landscapes and tea estates.",
          "Munnar": "A breathtaking destination with rolling tea gardens and misty hills.",
          "Kodaikanal": "The Princess of Hill Stations, famous for its lakes and cool climate."
        },
        "highlights": [
          "Ride the famous Nilgiri Mountain Railway in Ooty.",
          "Walk through the tea gardens of Munnar.",
          "Enjoy the misty beauty of Kodaikanal."
        ],
        "must_visit": [
          "Botanical Gardens",
          "Eravikulam National Park",
          "Mattupetty Dam",
          "Coaker's Walk",
          "Bryant Park"
        ],
        "gallery": [
          "https://example.com/images/south_hill1.jpg",
          "https://example.com/images/south_hill2.jpg",
          "https://example.com/images/south_hill3.jpg"
        ]
      },
      {
        "id": 3,
        "name": "East India Hill Station Tour",
        "introduction": "A scenic escape to the mystical hills of East India, covering Darjeeling, Gangtok, and Kalimpong. Enjoy the views of the Himalayas and lush greenery.",
        "tour_plan": [
          "Day 1: Arrival in Darjeeling - Visit Tiger Hill, Batasia Loop, and Darjeeling Tea Gardens.",
          "Day 2: Travel to Gangtok - Explore Tsomgo Lake, Rumtek Monastery, and MG Marg.",
          "Day 3: Drive to Kalimpong - Visit Deolo Hill, Durpin Monastery, and Pine View Nursery.",
          "Day 4: Return to Siliguri or Departure."
        ],
        "city_information": {
          "Darjeeling": "A charming hill station known for tea plantations and stunning Himalayan views.",
          "Gangtok": "A lively city offering monasteries, adventure, and breathtaking landscapes.",
          "Kalimpong": "A peaceful retreat with colonial-era architecture and scenic valleys."
        },
        "highlights": [
          "Watch the sunrise over Kanchenjunga from Tiger Hill.",
          "Visit the famous tea plantations of Darjeeling.",
          "Enjoy the vibrant culture of Gangtok."
        ],
        "must_visit": [
          "Tiger Hill",
          "Darjeeling Tea Gardens",
          "Tsomgo Lake",
          "Rumtek Monastery",
          "Deolo Hill"
        ],
        "gallery": [
          "https://example.com/images/east_hill1.jpg",
          "https://example.com/images/east_hill2.jpg",
          "https://example.com/images/east_hill3.jpg"
        ]
      },
      {
        "id": 4,
        "name": "West India Hill Station Tour",
        "introduction": "Experience the breathtaking beauty of the Western Ghats with this tour covering Mahabaleshwar, Lonavala, and Matheran.",
        "tour_plan": [
          "Day 1: Arrival in Mahabaleshwar - Visit Venna Lake, Arthur's Seat, and Mapro Garden.",
          "Day 2: Travel to Lonavala - Explore Bhushi Dam, Tiger's Leap, and Karla Caves.",
          "Day 3: Drive to Matheran - Enjoy Charlotte Lake, Panorama Point, and Louisa Point.",
          "Day 4: Return to Mumbai or Departure."
        ],
        "city_information": {
          "Mahabaleshwar": "A scenic retreat famous for strawberries, viewpoints, and lush forests.",
          "Lonavala": "A picturesque hill station known for its waterfalls, caves, and monsoon beauty.",
          "Matheran": "A peaceful, vehicle-free hill station with breathtaking viewpoints."
        },
        "highlights": [
          "Taste fresh strawberries in Mahabaleshwar.",
          "Explore the stunning waterfalls of Lonavala.",
          "Enjoy the toy train ride in Matheran."
        ],
        "must_visit": [
          "Venna Lake",
          "Bhushi Dam",
          "Tiger's Leap",
          "Charlotte Lake",
          "Louisa Point"
        ],
        "gallery": [
          "https://example.com/images/west_hill1.jpg",
          "https://example.com/images/west_hill2.jpg",
          "https://example.com/images/west_hill3.jpg"
        ]
      },
      {
        "id": 5,
        "name": "Central India Hill Station Tour",
        "introduction": "Explore the hidden gems of Central India with this tour covering Pachmarhi, Chikhaldara, and Amarkantak.",
        "tour_plan": [
          "Day 1: Arrival in Pachmarhi - Visit Bee Falls, Dhupgarh, and Jata Shankar Cave.",
          "Day 2: Travel to Chikhaldara - Explore Gavilgarh Fort, Bhimkund, and Melghat Tiger Reserve.",
          "Day 3: Drive to Amarkantak - Visit Narmada Kund, Kapil Dhara, and Sonmuda Viewpoint.",
          "Day 4: Return to Bhopal or Departure."
        ],
        "city_information": {
          "Pachmarhi": "A serene hill station with waterfalls, caves, and lush forests.",
          "Chikhaldara": "A scenic spot famous for its coffee plantations and wildlife sanctuary.",
          "Amarkantak": "A spiritual and natural retreat known for its river origins and temples."
        },
        "highlights": [
          "Enjoy the breathtaking views of Dhupgarh in Pachmarhi.",
          "Spot wildlife at Melghat Tiger Reserve.",
          "Visit the sacred Narmada Kund in Amarkantak."
        ],
        "must_visit": [
          "Bee Falls",
          "Gavilgarh Fort",
          "Melghat Tiger Reserve",
          "Narmada Kund",
          "Kapil Dhara"
        ],
        "gallery": [
          "https://example.com/images/central_hill1.jpg",
          "https://example.com/images/central_hill2.jpg",
          "https://example.com/images/central_hill3.jpg"
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
    // Handle the form submission logic here
    console.log('Form submitted:', formData);
    alert('Booking request submitted successfully! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      travelDate: '',
      adults: 1,
      children: 0,
      specialRequests: ''
    });
  };

  const handleViewDetails = (tour) => {
    setSelectedTour(tour);
    window.scrollTo(0, 0);
  };

  const handleBackToTours = () => {
    setSelectedTour(null);
  };

  // Get current date for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="hill-station-tours-container">
      <div className="tours-header">
        <h1>Breathtaking Hill Station Tours</h1>
        <p>Escape to the serene beauty of hill stations across India. Experience cool climates, misty mountains, lush valleys, and vibrant local cultures. Our carefully curated hill station packages offer the perfect blend of relaxation, adventure, and natural beauty.</p>
      </div>

      {selectedTour ? (
        <div className="tour-details-container">
          <button className="back-button" onClick={handleBackToTours}>
            &larr; Back to All Tours
          </button>
          
          <div className="tour-details-content">
            <div className="tour-details-left">
              <h2>{selectedTour.name}</h2>
              
              <div className="tour-image">
                <img src={selectedTour.gallery[0].replace('example.com', 'via.placeholder.com/600x400?text=Tour+Image')} alt={selectedTour.name} />
              </div>
              
              <div className="tour-section">
                <h3>Introduction</h3>
                <p>{selectedTour.introduction}</p>
              </div>
              
              <div className="tour-section">
                <h3>Tour Plan</h3>
                <ul>
                  {selectedTour.tour_plan.map((day, index) => (
                    <li key={index}>{day}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h3>City Information</h3>
                {Object.entries(selectedTour.city_information).map(([city, info], index) => (
                  <div key={index} className="city-info">
                    <h4>{city}</h4>
                    <p>{info}</p>
                  </div>
                ))}
              </div>
              
              <div className="tour-section">
                <h3>Highlights</h3>
                <ul>
                  {selectedTour.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h3>Must Visit</h3>
                <ul className="must-visit-list">
                  {selectedTour.must_visit.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>
              
              <div className="tour-section">
                <h3>Gallery</h3>
                <div className="tour-gallery">
                  {selectedTour.gallery.map((img, index) => (
                    <img 
                      key={index} 
                      src={img.replace('example.com', 'via.placeholder.com/300x200?text=Tour+Image')} 
                      alt={`${selectedTour.name} - Image ${index + 1}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="tour-details-right">
              <div className="booking-form-container">
                <h3>Book This Tour</h3>
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
                    <label htmlFor="travelDate">Preferred Travel Date</label>
                    <input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      min={today}
                      value={formData.travelDate}
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
                        min="1"
                        value={formData.adults}
                        onChange={handleInputChange}
                        required
                      />
                      </div>
                    
                    <div className="form-group half">
                      <label htmlFor="children">Children</label>
                      <input
                        type="number"
                        id="children"
                        name="children"
                        min="0"
                        value={formData.children}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows="4"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <button type="submit" className="book-now-btn">Book Now</button>
                  </div>
                  
                  <div className="form-disclaimer">
                    <p>* Our team will contact you within 24 hours to confirm availability and provide payment details.</p>
                  </div>
                </form>
              </div>
              
              <div className="tour-info-sidebar">
                <div className="tour-info-box">
                  <h4>Tour Duration</h4>
                  <p>4 Days / 3 Nights</p>
                </div>
                
                <div className="tour-info-box">
                  <h4>Group Size</h4>
                  <p>Maximum 15 people</p>
                </div>
                
                <div className="tour-info-box">
                  <h4>Inclusions</h4>
                  <ul>
                    <li>Accommodation</li>
                    <li>Daily breakfast & dinner</li>
                    <li>Transport & sightseeing</li>
                    <li>English-speaking guide</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tours-grid">
          {hillStationData.hill_station_tours.map((tour) => (
            <div className="tour-card" key={tour.id}>
              <div className="tour-card-image">
                <img src={tour.gallery[0].replace('example.com', 'via.placeholder.com/400x300?text=Tour+Image')} alt={tour.name} />
              </div>
              <div className="tour-card-content">
                <h3>{tour.name}</h3>
                <p>{tour.introduction.substring(0, 120)}...</p>
                <div className="tour-card-footer">
                  <button className="view-details-btn" onClick={() => handleViewDetails(tour)}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HillStation;