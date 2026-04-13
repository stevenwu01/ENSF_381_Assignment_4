import React from "react";
import OrderItem from "./OrderItem";

function OrderList({ orderItems, setOrderItems, userId, setMsg, setType }) {
    const calculateTotal = () => {
        return orderItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    function removeItem(flavorId) {
        fetch("http://localhost:5000/cart", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: Number(userId),
                flavorId: flavorId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setMsg(data.message);
                setType(data.success ? "success" : "error");

                if (data.success) {
                    setOrderItems(data.cart);
                }
            });
    }

    function updateQty(flavorId, newQuantity) {
        fetch("http://localhost:5000/cart", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: Number(userId),
                flavorId: flavorId,
                quantity: newQuantity
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setMsg(data.message);
                setType(data.success ? "success" : "error");

                if (data.success) {
                    setOrderItems(data.cart);
                }
            });
    }

    const total = calculateTotal();

    return (
        <div className="order-list">
            <h2>Your Order</h2>

            {orderItems.length === 0 ? (
                <p>No items in your order yet. Add some flavors!</p>
            ) : (
                <>
                    {orderItems.map((item) => (
                        <OrderItem
                            key={item.flavorId}
                            flavorId={item.flavorId}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onRemoveItem={removeItem}
                            onUpdateQuantity={updateQty}
                        />
                    ))}

                    <div className="order-total">
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </div>
                </>
            )}
        </div>
    );
}

export default OrderList;