import React from "react";
import FlavorItem from "./FlavorItem";

function FlavorCatalog({ flavors, onAddToOrder }) {
    return (
        <div className="flavor-grid">
            {flavors.map((flavor) => (
                <FlavorItem
                    key={flavor.id}
                    image={flavor.image}
                    name={flavor.name}
                    price={flavor.price}
                    description={flavor.description}
                    onAddToOrder={() => onAddToOrder(flavor)}
                />
            ))}
        </div>
    );
}

export default FlavorCatalog;