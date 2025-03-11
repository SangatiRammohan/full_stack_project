import React from "react";
import "./Packages.css";

const Packages = () => {
    const tourPackages = [
        {
            name: "Golden Triangle Tours",
            image: "https://source.unsplash.com/400x250/?tajmahal"
        },
        {
            name: "Weekend Tours",
            image: "https://source.unsplash.com/400x250/?weekend"
        },
        {
            name: "Hill Station Tours",
            image: "https://source.unsplash.com/400x250/?mountains"
        },
        {
            name: "Kerala-Goa Tour",
            image: "https://source.unsplash.com/400x250/?beach"
        },
        {
            name: "Summer Holiday Tour",
            image: "https://source.unsplash.com/400x250/?summer"
        },
        {
            name: "Beach Vacation Tours",
            image: "https://source.unsplash.com/400x250/?ocean"
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
