import React, { useState } from 'react';

const Goa = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const tourData = {
    "goa_mumbai_tours": [
      {
        "id": 1,
        "name": "North India Goa & Mumbai Tour",
        "introduction": "Experience the vibrant culture and scenic beauty of Goa and Mumbai along with the historical and spiritual wonders of North India.",
        "tour_plan": [
          "Day 1: Arrival in Delhi - Visit Red Fort, Humayun's Tomb, and India Gate.",
          "Day 2: Travel to Jaipur - Explore Amber Fort, Hawa Mahal, and Jantar Mantar.",
          "Day 3: Fly to Mumbai - Visit Gateway of India, Marine Drive, and Elephanta Caves.",
          "Day 4: Travel to Goa - Relax at Baga Beach, visit Fort Aguada, and enjoy nightlife at Tito's Lane.",
          "Day 5: Explore South Goa - Visit Colva Beach, Basilica of Bom Jesus, and Dudhsagar Waterfalls."
        ],
        "city_information": {
          "Delhi": "India's capital, a blend of Mughal history, bustling streets, and cultural heritage.",
          "Jaipur": "The Pink City, known for its royal palaces and colorful markets.",
          "Mumbai": "India's financial hub, famous for Bollywood, beaches, and colonial-era landmarks.",
          "Goa": "A tropical paradise known for its beaches, nightlife, and Portuguese influence."
        },
        "highlights": [
          "Enjoy the architectural marvels of Jaipur and Delhi.",
          "Experience Mumbai's fast-paced life and historic charm.",
          "Relax on Goa's stunning beaches and vibrant nightlife."
        ],
        "must_visit": [
          "Red Fort",
          "Amber Fort",
          "Gateway of India",
          "Baga Beach",
          "Basilica of Bom Jesus"
        ],
        "gallery": [
          "https://example.com/images/north_goa1.jpg",
          "https://example.com/images/north_goa2.jpg",
          "https://example.com/images/north_goa3.jpg"
        ]
      },
      {
        "id": 2,
        "name": "South India Goa & Mumbai Tour",
        "introduction": "A mesmerizing journey through the coastal beauty of South India, exploring Mumbai, Goa, and Kerala's backwaters.",
        "tour_plan": [
          "Day 1: Arrival in Chennai - Visit Marina Beach, Kapaleeshwarar Temple, and Fort St. George.",
          "Day 2: Travel to Kochi - Explore Fort Kochi, Chinese Fishing Nets, and Mattancherry Palace.",
          "Day 3: Fly to Mumbai - Visit Chhatrapati Shivaji Terminus, Juhu Beach, and Siddhivinayak Temple.",
          "Day 4: Travel to Goa - Enjoy Calangute Beach, Fort Aguada, and cruise on Mandovi River.",
          "Day 5: Explore South Goa - Visit Palolem Beach, Dudhsagar Waterfalls, and Old Goa Churches."
        ],
        "city_information": {
          "Chennai": "The capital of Tamil Nadu, known for its Dravidian temples and colonial history.",
          "Kochi": "A charming coastal city famous for its mix of Portuguese and Indian culture.",
          "Mumbai": "A city of contrasts with colonial architecture and modern skyscrapers.",
          "Goa": "A beach lover's paradise, offering adventure and relaxation."
        },
        "highlights": [
          "Discover Chennai's cultural and religious heritage.",
          "Experience the backwaters and cultural fusion in Kochi.",
          "Explore the nightlife and water sports in Goa."
        ],
        "must_visit": [
          "Marina Beach",
          "Fort Kochi",
          "Gateway of India",
          "Calangute Beach",
          "Dudhsagar Waterfalls"
        ],
        "gallery": [
          "https://example.com/images/south_goa1.jpg",
          "https://example.com/images/south_goa2.jpg",
          "https://example.com/images/south_goa3.jpg"
        ]
      },
      {
        "id": 3,
        "name": "East India Goa & Mumbai Tour",
        "introduction": "A unique combination of East India's spiritual wonders and the vibrant beach life of Goa and Mumbai.",
        "tour_plan": [
          "Day 1: Arrival in Kolkata - Visit Victoria Memorial, Howrah Bridge, and Dakshineswar Temple.",
          "Day 2: Travel to Bhubaneswar - Explore Lingaraj Temple, Udayagiri Caves, and Chilika Lake.",
          "Day 3: Fly to Mumbai - Visit Marine Drive, Elephanta Caves, and Bandra-Worli Sea Link.",
          "Day 4: Travel to Goa - Visit Anjuna Beach, Basilica of Bom Jesus, and enjoy a sunset cruise.",
          "Day 5: Explore South Goa - Visit Butterfly Beach, Cabo de Rama Fort, and spice plantations."
        ],
        "city_information": {
          "Kolkata": "The cultural capital of India, famous for its literary and artistic heritage.",
          "Bhubaneswar": "The temple city of India, home to ancient Hindu architecture.",
          "Mumbai": "A dynamic metropolis known for Bollywood and its coastal charm.",
          "Goa": "A favorite travel destination for its beaches, seafood, and vibrant festivals."
        },
        "highlights": [
          "Explore the colonial charm of Kolkata.",
          "Discover the ancient temples and caves of Bhubaneswar.",
          "Relax on the serene beaches of Goa."
        ],
        "must_visit": [
          "Victoria Memorial",
          "Lingaraj Temple",
          "Elephanta Caves",
          "Anjuna Beach",
          "Basilica of Bom Jesus"
        ],
        "gallery": [
          "https://example.com/images/east_goa1.jpg",
          "https://example.com/images/east_goa2.jpg",
          "https://example.com/images/east_goa3.jpg"
        ]
      },
      {
        "id": 4,
        "name": "West India Goa & Mumbai Tour",
        "introduction": "A perfect getaway to explore the best of West India's coastal beauty, including Mumbai and Goa's top attractions.",
        "tour_plan": [
          "Day 1: Arrival in Mumbai - Visit Gateway of India, Elephanta Caves, and Marine Drive.",
          "Day 2: Explore Lonavala - Visit Bhushi Dam, Tiger's Leap, and Karla Caves.",
          "Day 3: Travel to Goa - Relax at Vagator Beach, explore Chapora Fort, and cruise on Mandovi River.",
          "Day 4: Visit South Goa - Explore Palolem Beach, Shanta Durga Temple, and spice plantations.",
          "Day 5: Departure from Goa."
        ],
        "city_information": {
          "Mumbai": "A bustling city of business, entertainment, and colonial architecture.",
          "Lonavala": "A scenic hill station known for waterfalls, caves, and lush greenery.",
          "Goa": "A top beach destination with a blend of adventure and relaxation."
        },
        "highlights": [
          "Enjoy Mumbai's street food and nightlife.",
          "Visit Lonavala's stunning waterfalls and viewpoints.",
          "Experience the best beaches and forts in Goa."
        ],
        "must_visit": [
          "Gateway of India",
          "Bhushi Dam",
          "Vagator Beach",
          "Chapora Fort",
          "Palolem Beach"
        ],
        "gallery": [
          "https://example.com/images/west_goa1.jpg",
          "https://example.com/images/west_goa2.jpg",
          "https://example.com/images/west_goa3.jpg"
        ]
      }
    ]
  };

  const handleViewDetails = (tour) => {
    setSelectedTour(tour);
    setShowDetails(true);
    window.scrollTo(0, 0);
  };

  const handleBackToTours = () => {
    setShowDetails(false);
    setSelectedTour(null);
  };

  const BookingForm = () => {
    return (
      <div className="booking-form p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-blue-800">Book Your Tour</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input type="text" className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input type="email" className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input type="tel" className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Number of Travelers</label>
            <select className="w-full p-2 border rounded-md">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Travel Date</label>
            <input type="date" className="w-full p-2 border rounded-md" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Special Requests</label>
            <textarea className="w-full p-2 border rounded-md h-24"></textarea>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Book Now
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">India Wonders Travel</h1>
          <p className="mt-2 text-lg">Discover the magic of Goa & Mumbai with our exclusive tour packages</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!showDetails ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Featured Tours</h2>
              <p className="text-gray-600 text-lg">
                Experience the best of India with our carefully crafted tour packages combining the vibrant cities, 
                cultural heritage, and breathtaking beaches of Goa and Mumbai. Each tour offers a unique perspective 
                on India's diverse landscapes and rich traditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tourData.goa_mumbai_tours.map(tour => (
                <div key={tour.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={tour.gallery[0]} 
                    alt={tour.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {e.target.src = "/api/placeholder/800/500"; e.target.alt = "Tour image placeholder";}}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{tour.name}</h3>
                    <p className="text-gray-600 mb-4">{tour.introduction}</p>
                    <button 
                      onClick={() => handleViewDetails(tour)}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button 
              onClick={handleBackToTours}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Tours
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Tour Details (60%) */}
              <div className="lg:w-3/5">
                <img 
                  src={selectedTour.gallery[0]} 
                  alt={selectedTour.name}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                  onError={(e) => {e.target.src = "/api/placeholder/800/500"; e.target.alt = "Tour image placeholder";}}
                />
                
                <h2 className="text-3xl font-bold text-blue-800 mb-4">{selectedTour.name}</h2>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Introduction</h3>
                  <p className="text-gray-700">{selectedTour.introduction}</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Tour Plan</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedTour.tour_plan.map((day, index) => (
                      <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                        <p className="text-gray-700">{day}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">City Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedTour.city_information).map(([city, info]) => (
                      <div key={city} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700">{city}</h4>
                      <p className="text-gray-700">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Highlights</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {selectedTour.highlights.map((highlight, index) => (
                    <li key={index} className="mb-1">{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Must Visit Places</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTour.must_visit.map((place, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {place}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedTour.gallery.map((image, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${selectedTour.name} - Gallery ${index + 1}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {e.target.src = "/api/placeholder/400/300"; e.target.alt = "Gallery image placeholder";}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Form (40%) */}
            <div className="lg:w-2/5">
              <BookingForm />
            </div>
          </div>
        </div>
      )}
    </div>
    
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">India Wonders Travel</h3>
            <p>Creating unforgettable travel experiences since 2005</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Contact Us</h4>
              <p>Email: info@indiawonders.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300">Facebook</a>
                <a href="#" className="hover:text-blue-300">Instagram</a>
                <a href="#" className="hover:text-blue-300">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-blue-800 text-center">
          <p>&copy; 2025 India Wonders Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
);
};

export default Goa;
                      