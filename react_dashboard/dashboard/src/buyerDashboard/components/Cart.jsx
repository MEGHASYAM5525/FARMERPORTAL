// import React, { useState, useEffect } from "react";
// import "../../index.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   return (
//     <div>
//       <header className="cart-header">
//         <h2>Shopping Cart</h2>
//         <Link to="/">← Back to Shop</Link>
//       </header>

//       {cart.length > 0 ? (
//         cart.map((product, index) => (
//           <div key={index} className="cart-item">
//             <img src={product.image} alt={product.productName} className="cart-image" />
//             <h3>{product.productName}</h3>
//             <p>Price: ₹{product.price}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

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