import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("token");

  useEffect(() => {
    if (!loginToken) {
      alert("Please login to view your cart.");
      navigate("/login");
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, [loginToken, navigate]);

  return (
    <div>
      <button onClick={() => setIsCartOpen(!isCartOpen)} className="cart-toggle-button">
        {isCartOpen ? "Close Cart" : "🛒 View Cart"} ({cart.length})
      </button>
      
      {isCartOpen && (
        <div className="cart-container">
          <header className="cart-header">
            <h2>Shopping Cart</h2>
            <Link to="/">← Back to Shop</Link>
          </header>

          {cart.length > 0 ? (
            cart.map((product, index) => (
              <div key={index} className="cart-item">
                <img src={product.image} alt={product.productName} className="cart-image" />
                <h3>{product.productName}</h3>
                <p>Price: ₹{product.price}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;