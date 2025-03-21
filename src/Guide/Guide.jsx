import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guide.css";

 export const guides = [
  {
    id: 1,
    name: "John Doe",
    image: '../../public/Team/Rammohan_Sangati.jpg',
    description: "Experienced tour guide with 10+ years of experience in historical sites.",
    email: "john.doe@example.com",
    instagram: "@johndoe_tours",
    facebook: "facebook.com/johndoetours",
    available: true,
    x: "@johndoe_guide",
    bio: "John has been leading tours across historical sites for over a decade. With his background in history and archaeology, he brings ancient stories to life while ensuring everyone has a comfortable and enriching experience.",
    specialties: ["Historical sites", "Museum tours", "Architectural walks"],
    languages: ["English", "Hindi", "Bengali"],
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
    available: true,
    bio: "Jane is an adrenaline junkie with a deep love for nature. She has led expeditions in four continents and is certified in wilderness first aid, making her the perfect guide for your next adventure.",
    specialties: ["Wildlife safaris", "Hiking expeditions", "Extreme sports tours"],
    languages: ["English", "Hindi","Telugu"],
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
    available: true,
    bio: "With a background in culinary arts and cultural anthropology, David specializes in immersive experiences that engage all your senses. His food tours have been featured in several travel magazines.",
    specialties: ["Food tours", "Cultural immersion", "Artisan workshops"],
    languages: ["English", "Hindi", "Tamil"],
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
    available: false,
    bio: "Emily has conquered some of the world's most challenging peaks and now shares her passion for mountains with others. She's certified in mountain rescue and is known for her patience with beginners.",
    specialties: ["Mountain trekking", "Alpine climbing", "Winter hiking"],
    languages: ["English", "malayalam", "Hindi"],
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
    available: true,
    bio: "Michael holds a degree in Architecture and has an eye for urban design. His tours highlight both famous landmarks and hidden gems, offering insights into how cities evolve over time.",
    specialties: ["Urban exploration", "Architectural tours", "Photography walks"],
    languages: ["English", "Telugu", "Tamil"],
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
    available: false,
    instagram: "@sophiablack_global",
    facebook: "facebook.com/sophiablacktours",
    x: "@sophiablack_guide",
    bio: "Having lived in six countries, Sophia specializes in bridging cultural gaps. She's known for creating customized experiences that help travelers connect deeply with local communities.",
    specialties: ["Cultural interpretation", "Custom itineraries", "Language immersion"],
    languages: ["English", "Marati", "Kanada", "Telugu", "Hindi"],
    reviews: [
      { author: "Amir K.", rating: 5, text: "Sophia's language skills made our trip so much smoother. She helped us connect with locals in a way we couldn't have otherwise." },
      { author: "Charlotte W.", rating: 5, text: "The perfect guide for international travelers. Her cultural insights are invaluable." }
    ]
  }
];

// Global variable to store the selected guide
let selectedGuide = null;

// Function to get the selected guide
export const getSelectedGuide = () => selectedGuide;

// Function to set the selected guide
export const setSelectedGuide = (guide) => {
  selectedGuide = guide;
};

const Guide = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGuideLocal, setSelectedGuideLocal] = useState(null);
  const navigate = useNavigate();

  const handleLearnMoreClick = (e, guide) => {
    e.preventDefault();
    setSelectedGuideLocal(guide);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGuideLocal(null);
    document.body.style.overflow = "auto";
  };

  const handleBookNowClick = () => {
    if (selectedGuideLocal) {
      setSelectedGuide(selectedGuideLocal); // Set the global selected guide
    }
    closeModal();
    navigate("/packages");
  };

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, i) => (
        <span key={i} className="star">
          ★
        </span>
      ));
  };

  return (
    <div className="guides-page">
      <div className="guides-hero">
        <div className="guides-hero-content">
          <h1>Meet Our Professional Tour Guides</h1>
          <p>Experienced, knowledgeable, and passionate about sharing our world with you</p>
        </div>
      </div>

      <div className="guides-container">
        <div className="guides-grid">
          {guides.map((guide) => (
            <div className="guide-card" key={guide.id}>
              <div className="guide-card-image">
                <img src={guide.image} alt={guide.name} />
                <div className="guide-lang-badges">
                  {guide.languages.slice(0, 3).map((lang, idx) => (
                    <span key={idx} className="lang-badge">
                      {lang}
                    </span>
                  ))}
                  {guide.languages.length > 3 && (
                    <span className="lang-badge lang-badge-more">+{guide.languages.length - 3}</span>
                  )}
                </div>
              </div>
              <div className="guide-card-content">
                <h3>{guide.name}</h3>
                <p className="guide-description">{guide.description}</p>
                <div className="guide-specialties">
                  {guide.specialties.slice(0, 2).map((specialty, idx) => (
                    <span key={idx} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="guide-card-footer">
                  <div className="guide-rating">
                    {renderStars(
                      Math.round(
                        guide.reviews.reduce((acc, review) => acc + review.rating, 0) /
                          guide.reviews.length
                      )
                    )}
                    <span className="review-count">({guide.reviews.length})</span>
                  </div>
                  <button
                    className="learn-more-btn"
                    onClick={(e) => handleLearnMoreClick(e, guide)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedGuideLocal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              &times;
            </button>

            <div className="modal-scrollable">
              <div className="modal-header">
                <div className="modal-guide-image">
                  <img src={selectedGuideLocal.image} alt={selectedGuideLocal.name} />
                </div>
                <div className="modal-guide-info">
                  <h2>{selectedGuideLocal.name}</h2>
                  <p className="modal-guide-desc">{selectedGuideLocal.description}</p>
                  <div className="modal-guide-langs">
                    {selectedGuideLocal.languages.map((lang, idx) => (
                      <span key={idx} className="modal-lang-badge">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <section className="modal-section">
                  <h3>About</h3>
                  <p>{selectedGuideLocal.bio}</p>
                </section>

                <section className="modal-section">
                  <h3>Specialties</h3>
                  <div className="modal-specialties">
                    {selectedGuideLocal.specialties.map((specialty, idx) => (
                      <span key={idx} className="modal-specialty">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="modal-actions">
                  <button className="book-tour-btn" onClick={handleBookNowClick}>
                    Book Tour with {selectedGuideLocal.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;