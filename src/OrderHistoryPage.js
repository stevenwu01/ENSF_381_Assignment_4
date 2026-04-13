import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/orders?userId=" + userId)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      });
  }, [userId]);

  return (
    <div>
      <Header />

      <div className="content">
        <h2>Order History</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map(function(order) {
            return (
              <div key={order.orderId}>
                <h3>Order #{order.orderId}</h3>
                <p>Date: {order.timestamp}</p>

                {order.items.map(function(item) {
                  return (
                    <div key={item.flavorId}>
                      <p>
                        {item.name} - ${item.price} x {item.quantity}
                      </p>
                    </div>
                  );
                })}

                <p>Total: ${order.total}</p>
                <hr />
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </div>
  );
}

export default OrderHistoryPage;