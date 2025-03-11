import React from 'react';
import './About.css';


const AboutPage =React.forwardRef((props, ref) => {
  return (
    <div className="about-page" ref={ref} >

      <div className="about-hero">
        <div className="about-hero-image">
          <img 
            src="/HeroAssests/about-hero.jpeg" 
            alt="CityPulse About Us" 
            className="hero-image"
          />
        </div>
        <div className="about-hero-content">
          <h1>Discover CityPulse: Your Global Travel Companion</h1>
          <p>
            CityPulse is more than just a travel agency – we're your gateway to extraordinary experiences 
            and unforgettable journeys. Founded in 2020, we've been dedicated to creating unique, immersive 
            travel experiences that go beyond traditional tourism.
          </p>
          <div className="about-hero-stats">
            <div className="stat">
              <h3>5+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Destinations</p>
            </div>
            <div className="stat">
              <h3>10k+</h3>
              <p>Happy Travelers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-mission">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At CityPulse, we believe in transforming travel from a mere journey to a life-changing experience. 
            Our mission is to craft personalized, sustainable, and immersive travel experiences that connect 
            travelers with local cultures, landscapes, and communities.
          </p>
        </div>
      </div>

      <div className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Authenticity</h3>
            <p>
              We prioritize genuine, local experiences that offer deep cultural insights 
              and meaningful connections.
            </p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>
              We are committed to responsible tourism that respects local environments 
              and supports community development.
            </p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>
              We continuously explore new destinations and create unique travel experiences 
              that challenge traditional tourism.
            </p>
          </div>
          <div className="value-card">
            <h3>Customer Care</h3>
            <p>
              Our travelers are our priority. We provide personalized support and 
              ensure comfort throughout the journey.
            </p>
          </div>
        </div>
      </div>

      <div className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-preview">
          <div className="team-member">
            <img 
              src="/HeroAssests/team1.jpeg" 
              alt="Team Member 1" 
              className="team-image"
            />
            <h3>Sarah Johnson</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img 
              src="/HeroAssests/team2.jpeg" 
              alt="Team Member 2" 
              className="team-image"
            />
            <h3>Michael Chen</h3>
            <p>Chief Experience Officer</p>
          </div>
          <div className="team-member">
            <img 
              src="/HeroAssests/team3.jpeg" 
              alt="Team Member 3" 
              className="team-image"
            />
            <h3>Elena Rodriguez</h3>
            <p>Head of Sustainable Tourism</p>
          </div>
        </div>
      </div>
    </div>

    
  );
});

export default AboutPage;