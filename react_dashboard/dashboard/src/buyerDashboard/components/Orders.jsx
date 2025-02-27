import React, { useEffect, useState } from "react";
import "./Orders.css"; // Import the CSS file

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const buyerId = localStorage.getItem("buyerId");

  useEffect(() => {
    if (buyerId) {
      const storedOrders = JSON.parse(localStorage.getItem(`orders_${buyerId}`)) || [];
      setOrders(storedOrders);
    }
  }, [buyerId]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-box">
            <h3 className="order-id">Order #{order.id}</h3>
            <p className="order-date"><strong>Date:</strong> {order.date}</p>
            <p className="order-total"><strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>
            <ul className="order-items">
              {order.products.map((product, index) => (
                <li key={index} className="order-item">
                  <div className="product-box">
                    <span className="product-name">{product.productName}</span> - 
                    <span className="product-price"> ₹{product.price}</span> x 
                    <span className="product-quantity"> {product.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
