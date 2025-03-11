import './Hero.css'
import React, { useState } from 'react';
import { Play } from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleWatchTour = () => {
    setIsVideoOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };
  return (
    <>
    <section>
      <div className="hero">
        <div className="heropart1">
          <p>CityPulse</p>
          <h1>Your Perfect Tours <span>Around the World</span> Start Here!</h1>
          <h2>Join our group and individual tours. Enjoy your vacations and get amazing emotions!</h2>
            <div className="tour-buttons-container">
      <button className="explore-tours-btn">
        Explore Tours
      </button>
      
      <button 
        className="watch-tour-btn" 
        onClick={handleWatchTour}
      >
        <Play className="play-icon" size={20} />
        Watch Tour
      </button>

      {isVideoOpen && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div 
            className="video-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-video-btn" 
              onClick={closeVideoModal}
            >
              &times;
            </button>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/BcqKFHcx9iY?si=W8jJbsaeIGto1PYt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
      )}
    </div>
        </div>
        <div className="heropart2">
          <img src="../../../public/HeroAssests/travel.png" alt="" />
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero
