import React from 'react'
import './City.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const City = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024, // Tablets & small laptops
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // Tablets
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480, // Mobile phones
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

     const tourdata= [
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
          "image": "https://via.placeholder.com/800x400",
          "date": "March 3-6, 2025",
          "title": "Hill Station Tour",
          "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, provident!",
          "price": "$700",
          "group_size": "10-15 Group",
          "duration": "4 days"
        }
      ]
      
  return (
    <>
      <main className='mainsection'>
        <div className="populartour">
            <h3>Most Popular</h3>
            <h1>Explore our Top Destinations</h1>
            <span className="line"></span>
            <h5>Check best tous starting shortly</h5>
        </div>
        <div className="tourCurooul">
        <Slider {...settings}>
        {tourdata.map((tour) => (
  <div className="tourCards" key={tour.id}>
    <img src={tour.image} alt={tour.title} />
    <h3>{tour.date}</h3>
    <div className="tourdetails">
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <div className="tourtime">
        <p className="tourdays">{tour.price}</p>
        <p className="tourdays">{tour.group_size}</p>
        <p className="tourdays">{tour.duration}</p>
      </div>
    </div>
    <button className='tourbtn'> Explore Tour</button>
  </div>
))}
        </Slider>
        </div>
      </main>
    </>
  )
}

export default City
