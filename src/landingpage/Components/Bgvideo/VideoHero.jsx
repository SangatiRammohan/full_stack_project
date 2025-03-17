import React from 'react';
import './VideoHero.css';

const VideoHero = () => {
  return (
    <div className="video-hero-container">
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        height={100}
      >
        <source 
          src='' 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="video-hero-overlay"></div>
      
      <div className="video-hero-content">
        <h1 className="video-hero-title">
          Discover Extraordinary Journeys
        </h1>
        
        <p className="video-hero-description">
          Embark on unforgettable adventures that transform your perspective. 
          CityPulse offers immersive travel experiences that connect you with 
          the world's most breathtaking destinations.
        </p>
        
        <button className="explore-tours-btn">
          Explore Tours
        </button>
      </div>
    </div>
  );
};

export default VideoHero;