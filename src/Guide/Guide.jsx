import React, { useState } from "react";
import "./Guide.css";

const guides = [
  {
    id: 1,
    name: "John Doe",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Experienced tour guide with 10+ years of experience in historical sites.",
    email: "john.doe@example.com",
    instagram: "@johndoe_tours",
    facebook: "facebook.com/johndoetours",
    x: "@johndoe_guide",
    bio: "John has been leading tours across historical sites for over a decade. With his background in history and archaeology, he brings ancient stories to life while ensuring everyone has a comfortable and enriching experience.",
    specialties: ["Historical sites", "Museum tours", "Architectural walks"],
    languages: ["English", "Spanish", "French"],
    reviews: [
      { author: "Sarah M.", rating: 5, text: "John was incredibly knowledgeable and made our tour fascinating!" },
      { author: "James K.", rating: 5, text: "Best historical tour I've ever taken. John is a walking encyclopedia." }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Specialist in adventure tours and wildlife safaris.",
    email: "jane.smith@example.com",
    instagram: "@janesmith_adventures",
    facebook: "facebook.com/janesmithtours",
    x: "@janesmith_guide",
    bio: "Jane is an adrenaline junkie with a deep love for nature. She has led expeditions in four continents and is certified in wilderness first aid, making her the perfect guide for your next adventure.",
    specialties: ["Wildlife safaris", "Hiking expeditions", "Extreme sports tours"],
    languages: ["English", "German"],
    reviews: [
      { author: "Michael T.", rating: 5, text: "Jane made our safari unforgettable. Her knowledge of wildlife is impressive!" },
      { author: "Lisa R.", rating: 4, text: "Great adventure guide, very safety conscious while still making it exciting." }
    ]
  },
  {
    id: 3,
    name: "David Brown",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Expert in cultural tours and local cuisines.",
    email: "david.brown@example.com",
    instagram: "@davidbrown_culture",
    facebook: "facebook.com/davidbrowntours",
    x: "@davidbrown_guide",
    bio: "With a background in culinary arts and cultural anthropology, David specializes in immersive experiences that engage all your senses. His food tours have been featured in several travel magazines.",
    specialties: ["Food tours", "Cultural immersion", "Artisan workshops"],
    languages: ["English", "Italian", "Portuguese"],
    reviews: [
      { author: "Emma J.", rating: 5, text: "David's food tour was the highlight of our trip! We discovered places we would never have found on our own." },
      { author: "Robert P.", rating: 5, text: "Incredible knowledge of local cuisine and culture. Highly recommend!" }
    ]
  },
  {
    id: 4,
    name: "Emily White",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Certified hiking and trekking guide with mountain experience.",
    email: "emily.white@example.com",
    instagram: "@emilywhite_hiking",
    facebook: "facebook.com/emilywhitetours",
    x: "@emilywhite_guide",
    bio: "Emily has conquered some of the world's most challenging peaks and now shares her passion for mountains with others. She's certified in mountain rescue and is known for her patience with beginners.",
    specialties: ["Mountain trekking", "Alpine climbing", "Winter hiking"],
    languages: ["English", "Nepali", "Swedish"],
    reviews: [
      { author: "Daniel F.", rating: 5, text: "Emily made our first serious hike feel safe and enjoyable. Her knowledge of the trails is excellent." },
      { author: "Sophia L.", rating: 4, text: "Great guide for challenging treks. Very supportive and encouraging." }
    ]
  },
  {
    id: 5,
    name: "Michael Green",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Passionate about city tours and architectural history.",
    email: "michael.green@example.com",
    instagram: "@michaelgreen_city",
    facebook: "facebook.com/michaelgreentours",
    x: "@michaelgreen_guide",
    bio: "Michael holds a degree in Architecture and has an eye for urban design. His tours highlight both famous landmarks and hidden gems, offering insights into how cities evolve over time.",
    specialties: ["Urban exploration", "Architectural tours", "Photography walks"],
    languages: ["English", "Japanese", "Dutch"],
    reviews: [
      { author: "Jennifer R.", rating: 5, text: "Michael showed us aspects of the city I've walked past for years but never noticed. Fascinating tour!" },
      { author: "Kevin M.", rating: 5, text: "His knowledge of architecture and urban history is impressive. Excellent guide." }
    ]
  },
  {
    id: 6,
    name: "Sophia Black",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Fluent in multiple languages for international travelers.",
    email: "sophia.black@example.com",
    instagram: "@sophiablack_global",
    facebook: "facebook.com/sophiablacktours",
    x: "@sophiablack_guide",
    bio: "Having lived in six countries, Sophia specializes in bridging cultural gaps. She's known for creating customized experiences that help travelers connect deeply with local communities.",
    specialties: ["Cultural interpretation", "Custom itineraries", "Language immersion"],
    languages: ["English", "Mandarin", "Arabic", "Russian", "Hindi"],
    reviews: [
      { author: "Amir K.", rating: 5, text: "Sophia's language skills made our trip so much smoother. She helped us connect with locals in a way we couldn't have otherwise." },
      { author: "Charlotte W.", rating: 5, text: "The perfect guide for international travelers. Her cultural insights are invaluable." }
    ]
  }
];

const Guide = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (id) => {
    setFlippedCards(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleContactClick = (e, guide) => {
    e.stopPropagation(); // Prevent card flip
    setSelectedGuide(guide);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGuide(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <>
      <h1>Our Tour Guides</h1>
      <div className="guide-container">
        {guides.map((guide) => (
          <div 
            className={`guide-card-wrapper ${flippedCards[guide.id] ? 'flipped' : ''}`} 
            key={guide.id}
            onClick={() => handleCardClick(guide.id)}
          >
            <div className="guide-card">
              {/* Front of card */}
              <div className="card-front">
                <div className="guide-image">
                  <img src={guide.image} alt={guide.name} />
                  <button 
                    className="contact-btn"
                    onClick={(e) => handleContactClick(e, guide)}
                  >
                    Contact
                  </button>
                </div>
                <div className="guide-info">
                  <h3>{guide.name}</h3>
                  <p>{guide.description}</p>
                </div>
              </div>

              {/* Back of card */}
              <div className="card-back">
                <h3>{guide.name}</h3>
                <div className="social-info">
                  <p><strong>Email:</strong> {guide.email}</p>
                  <p><strong>Instagram:</strong> {guide.instagram}</p>
                  <p><strong>Facebook:</strong> {guide.facebook}</p>
                  <p><strong>X:</strong> {guide.x}</p>
                </div>
                <button 
                  className="back-btn"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleCardClick(guide.id);
                  }}
                >
                  Back to Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen modal */}
      {showModal && selectedGuide && (
        <div className="guide-modal-overlay">
          <div className="guide-modal">
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-image">
                  <img src={selectedGuide.image} alt={selectedGuide.name} />
                </div>
                <div className="modal-title">
                  <h2>{selectedGuide.name}</h2>
                  <p className="modal-subtitle">{selectedGuide.description}</p>
                </div>
              </div>
              
              <div className="modal-body">
                <div className="modal-section">
                  <h3>About</h3>
                  <p>{selectedGuide.bio}</p>
                </div>
                
                <div className="modal-section">
                  <h3>Specialties</h3>
                  <ul className="specialty-list">
                    {selectedGuide.specialties.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3>Languages</h3>
                  <div className="language-tags">
                    {selectedGuide.languages.map((language, index) => (
                      <span key={index} className="language-tag">{language}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Contact Information</h3>
                  <div className="contact-info">
                    <p><strong>Email:</strong> {selectedGuide.email}</p>
                    <div className="social-links">
                      <a href={`https://instagram.com/${selectedGuide.instagram.substring(1)}`} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                        Instagram
                      </a>
                      <a href={`https://${selectedGuide.facebook}`} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                        Facebook
                      </a>
                      <a href={`https://x.com/${selectedGuide.x.substring(1)}`} target="_blank" rel="noopener noreferrer" className="social-link x">
                        X
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="modal-section">
                  <h3>Reviews</h3>
                  <div className="reviews">
                    {selectedGuide.reviews.map((review, index) => (
                      <div key={index} className="review">
                        <div className="review-header">
                          <span className="review-author">{review.author}</span>
                          <div className="review-rating">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="star">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="book-btn">Book a Tour</button>
                  <button className="message-btn">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Guide;