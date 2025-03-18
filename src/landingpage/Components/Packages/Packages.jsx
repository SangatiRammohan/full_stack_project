import React from "react";
import "./Packages.css";
import p1 from '../../../../public/CityTours/GoldenTriangle/Golden-Triangle-Holiday-Tour-logo.jpg'
import p2 from '../../../../public/CityTours/weekend/weekend-tour-logo.jpg'
import p3 from "../../../../public/CityTours/HillStation/Hillstation-logo.jpg"
import p4 from '../../../../public/CityTours/kerala/Kerala-Image-logo.jpg'
import p5 from '../../../../public/CityTours/Goa/goa-logo.jpg' 
import p6 from '../../../../public/CityTours/Summer/Summer-logo.jpg'
import p7 from '../../../../public/CityTours/beach/Beach-logo.jpg'
const Packages = () => {
    const tourPackages = [
        {
            name: "Golden Triangle Tours",
            image:{p1}
        },
        {
            name: "Weekend Tours",
            image: {p2}
        },
        {
            name: "Hill Station Tours",
            image:{p3}
        },
        {
            name: "Kerala Tour",
            image: {p4}
        },
        {
            name: "Goa Tour",
            image:  {p5}
        },
        {
            name: "Summer Holiday Tour",
            image:{p6}
        },
        {
            name: "Beach Vacation Tours",
            image: {p7}
        },
    ];

    return (
        <div className="packages-container">
            {/* Title & Description */}
            <div className="packages-header">
                <h1>City Tours</h1>
                <p>Explore the best destinations with our specially curated tour packages. Experience breathtaking landscapes, vibrant cultures, and unforgettable adventures.</p>
            </div>

            {/* Tour Cards */}
            <div className="packages-grid">
                {tourPackages.map((tour, index) => (
                    <div key={index} className="package-card">
                        <img src={tour.image} alt={tour.name} />
                        <div className="package-overlay">
                            <h3>{tour.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
