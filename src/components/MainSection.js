import React, { useState, useEffect } from "react";

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/flavors")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFeaturedFlavors(data.flavors.slice(0, 3));
        }
      });

    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelectedReviews(data.reviews);
        }
      });
  }, []);

  return (
    <div className="main-section">

      <h2>About Sweet Scoop</h2>
      <p>
        Sweet Scoop is a small ice cream shop that serves fresh and delicious
        ice cream with a variety of flavors.
      </p>

      <h2>Featured Flavors</h2>
      <div className="flavor-grid">
        {featuredFlavors.map((flavor) => (
          <div key={flavor.id} className="flavor-card">
            <h3>{flavor.name}</h3>
            <p>{flavor.price}</p>
            <img src={flavor.image} alt={flavor.name} />
          </div>
        ))}
      </div>

      <h2>Customer Reviews</h2>
      {selectedReviews.map((review, index) => (
        <div key={index}>
          <h4>{review.customerName}</h4>
          <p>{"★".repeat(review.rating)}</p>
          <p>{review.review}</p>
        </div>
      ))}

    </div>
  );
}

export default MainSection;