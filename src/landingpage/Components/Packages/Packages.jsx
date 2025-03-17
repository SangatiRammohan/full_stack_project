import React from "react";
import "./Packages.css";
const Packages = () => {
    const tourPackages = [
        {
            name: "Golden Triangle Tours",
            image:'../../../../public/CityTours/GoldenTriangle/Golden-Triangle-Holiday-Tour-logo.jpg'
        },
        {
            name: "Weekend Tours",
            image: '../../../../public/CityTours/weekend/weekend-tour-logo.jpg'
        },
        {
            name: "Hill Station Tours",
            image: '../../../../public/CityTours/HillStation/Hillstation-logo.jpg'
        },
        {
            name: "Kerala Tour",
            image: '../../../../public/CityTours/kerala/Kerala-Image-logo.jpg'
        },
        {
            name: "Goa Tour",
            image:  '../../../../public/CityTours/Goa/goa-logo.jpg'
        },
        {
            name: "Summer Holiday Tour",
            image:'../../../../public/CityTours/Summer/Summer-logo.jpg'
        },
        {
            name: "Beach Vacation Tours",
            image: '../../../../public/CityTours/beach/Beach-logo.jpg'
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
