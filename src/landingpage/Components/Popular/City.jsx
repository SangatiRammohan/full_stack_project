import React, { useState } from 'react';
import './City.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const City = () => {
  const tourdata = [
    {
      "id": 1,
      "image": '../../../public/HeroAssests/image1.jpeg',
      "date": "March 3-6, 2025",
      "title": "Hill Station Tour",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$700",
      "group_size": "10-15 Group",
      "duration": "4 days"
    },
    {
      "id": 2,
      "image": "../../../public/HeroAssests/image1.jpeg",
      "date": "March 3-6, 2025",
      "title": "Hill Station Tour",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$700",
      "group_size": "10-15 Group",
      "duration": "4 days"
    },
    {
      "id": 3,
      "image": "../../../public/HeroAssests/image1.jpeg",
      "date": "March 3-6, 2025",
      "title": "Hill Station Tour",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$700",
      "group_size": "10-15 Group",
      "duration": "4 days"
    },
    {
      "id": 4,
      "image": "../../../public/HeroAssests/image1.jpeg",
      "date": "March 3-6, 2025",
      "title": "Hill Station Tour",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$700",
      "group_size": "10-15 Group",
      "duration": "4 days"
    },
    {
      "id": 5,
      "image": "../../../public/HeroAssests/image1.jpeg",
      "date": "March 3-6, 2025",
      "title": "Beach Resort Tour",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$850",
      "group_size": "8-12 Group",
      "duration": "5 days"
    },
    {
      "id": 6,
      "image": "../../../public/HeroAssests/image1.jpeg",
      "date": "April 10-15, 2025",
      "title": "Mountain Expedition",
      "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
      "price": "$950",
      "group_size": "6-10 Group",
      "duration": "6 days"
    }
  ];

  // Custom previous arrow component
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className="slick-arrow custom-prev-arrow" onClick={onClick}>
        <i className="prev-icon">❮</i>
      </div>
    );
  };

  // Custom next arrow component
  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className="slick-arrow custom-next-arrow" onClick={onClick}>
        <i className="next-icon">❯</i>
      </div>
    );
  };

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    customPaging: i => (
      <div className="custom-dot"></div>
    )
  };

  return (
    <>
      <main className='mainsection'>
        <div className="populartour">
          <h3>Most Popular</h3>
          <h1>Explore our Top Destinations</h1>
          <span className="line"></span>
          <h5>Check best tours starting shortly</h5>
        </div>
        
        <div className="tourCarousel">
          <Slider {...settings}>
            {tourdata.map((tour) => (
              <div className="tourCard-wrapper" key={tour.id}>
                <div className="tourCards">
                  <div className="tour-image-container">
                    <img src={tour.image} alt={tour.title} />
                    <div className="tour-date">{tour.date}</div>
                  </div>
                  <div className="tourdetails">
                    <h2>{tour.title}</h2>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tourtime">
                      <div className="tour-info">
                        <span className="info-icon">💰</span>
                        <p className="tourdays">{tour.price}</p>
                      </div>
                      <div className="tour-info">
                        <span className="info-icon">👥</span>
                        <p className="tourdays">{tour.group_size}</p>
                      </div>
                      <div className="tour-info">
                        <span className="info-icon">⏱️</span>
                        <p className="tourdays">{tour.duration}</p>
                      </div>
                    </div>
                    <button className='tourbtn'>Explore Tour</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </>
  );
};

export default City;