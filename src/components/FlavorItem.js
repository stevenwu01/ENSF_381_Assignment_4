import React, { useState } from "react";

function FlavorItem({ image, name, price, description, onAddToOrder }) {
    const [showDesc, setShowDesc] = useState(false);

    return (
        <div className="flavor-card" onMouseEnter={() => setShowDesc(true)} onMouseLeave={() => setShowDesc(false)}
        >
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p className="price">{price}</p>

            {showDesc && (
                <p className="description">{description}</p>
            )}

            <button onClick={onAddToOrder}>
                Add to Order
            </button>
        </div>
    );
}

export default FlavorItem;