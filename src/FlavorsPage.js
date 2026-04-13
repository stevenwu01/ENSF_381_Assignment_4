import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FlavorCatalog from "./components/FlavorCatalog";
import OrderList from "./components/OrderList";
import DisplayStatus from "./components/DisplayStatus";

function FlavorsPage() {
    const [flavors, setFlavors] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMsg] = useState("");
    const [type, setType] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetch("http://localhost:5000/flavors")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setFlavors(data.flavors);
                }
            });

        fetch("http://localhost:5000/cart?userId=" + userId)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setOrderItems(data.cart);
                }
            });
    }, [userId]);

    function addToCart(flavor) {
        const existingItem = orderItems.find((item) => item.flavorId === flavor.id);

        if (existingItem) {
            fetch("http://localhost:5000/cart", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    flavorId: flavor.id,
                    quantity: existingItem.quantity + 1
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    setMsg(data.message);
                    setType(data.success ? "success" : "error");

                    if (data.success) {
                        setOrderItems(data.cart);
                    }
                })
                .catch(() => {
                    setMsg("Something went wrong");
                    setType("error");
                });
        } else {
            fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    flavorId: flavor.id
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    setMsg(data.message);
                    setType(data.success ? "success" : "error");

                    if (data.success) {
                        setOrderItems(data.cart);
                    }
                })
                .catch(() => {
                    setMsg("Something went wrong");
                    setType("error");
                });
        }
    }

    function placeOrder() {
        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: Number(userId)
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setMsg(data.message);
                setType(data.success ? "success" : "error");

                if (data.success) {
                    setOrderItems([]);
                }
            })
            .catch(() => {
                setMsg("Something went wrong");
                setType("error");
            });
    }

    return (
        <div className="flavors-page">
            <Header />
            <div className="content">
                {message !== "" && (
                    <DisplayStatus type={type} message={message} />
                )}

                <FlavorCatalog flavors={flavors} onAddToOrder={addToCart} />

                <OrderList
                    orderItems={orderItems}
                    setOrderItems={setOrderItems}
                    userId={userId}
                    setMsg={setMsg}   
                    setType={setType}
                />

                <button onClick={placeOrder}>Place Order</button>
            </div>
            <Footer />
        </div>
    );
}

export default FlavorsPage;