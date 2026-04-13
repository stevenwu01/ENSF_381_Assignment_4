import React from "react";

function OrderItem({ flavorId, name, price, quantity, onRemoveItem, onUpdateQuantity }) {
    function removeItem() {
        if (quantity === 1) {
            onRemoveItem(flavorId);
        } else {
            onUpdateQuantity(flavorId, quantity - 1);
        }
    }

    return (
        <div className="order-item">
            <span className="item-name">{name}</span>
            <span className="item-quantity">x{quantity}</span>
            <span className="item-price">${price.toFixed(2)}</span>
            <button className="remove" onClick={removeItem}>
                Remove Item
            </button>
        </div>
    );
}

export default OrderItem;