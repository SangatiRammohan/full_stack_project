import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import "./Hero.css";
import i from '../../../../public/HeroAssests/sbg1.jpg'
import i1 from '../../../../public/HeroAssests/sbg2.jpg'
import i2 from '../../../../public/HeroAssests/sbg3.jpg'

const images = [
 i,i1,i2
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWatchTour = () => {
    setIsVideoOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <div className="hero">
        {/* Carousel Images */}
        <div className="carousel">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={`carousel-image ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Overlay Text */}
        <div className="hero-text">
          <h1>
            Your Perfect Tours <span>Around the World</span> Start Here!
          </h1>
          <h2>
            Join our group and individual tours. Enjoy your vacations and get amazing emotions!
          </h2>

          {/* Buttons */}
          <div className="tour-buttons-container">
            <button className="explore-tours-btn">
              Explore Tours
            </button>
            <button className="watch-tour-btn" onClick={handleWatchTour}>
              <Play className="play-icon" size={20} />
              Watch Tour
            </button>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="video-modal" onClick={closeVideoModal}>
            <div className="video-container" onClick={(e) => e.stopPropagation()}>
              <button className="close-video-btn" onClick={closeVideoModal} aria-label="Close video">
                &times;
              </button>
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/BcqKFHcx9iY?si=W8jJbsaeIGto1PYt"
                title="YouTube video player"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
