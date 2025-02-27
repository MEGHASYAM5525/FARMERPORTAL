// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import "../../index.css";

// // const Cart = () => {
// //   const [cart, setCart] = useState([]);
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const navigate = useNavigate();
// //   const loginToken = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (!loginToken) {
// //       alert("Please login to view your cart.");
// //       navigate("/login");
// //     } else {
// //       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
// //       setCart(savedCart);
// //     }
// //   }, [loginToken, navigate]);

// //   return (
// //     <div>
// //       <button onClick={() => setIsCartOpen(!isCartOpen)} className="cart-toggle-button">
// //         {isCartOpen ? "Close Cart" : "🛒 View Cart"} ({cart.length})
// //       </button>
      
// //       {isCartOpen && (
// //         <div className="cart-container">
// //           <header className="cart-header">
// //             <h2>Shopping Cart</h2>
// //             <Link to="/">← Back to Shop</Link>
// //           </header>

// //           {cart.length > 0 ? (
// //             cart.map((product, index) => (
// //               <div key={index} className="cart-item">
// //                 <img src={product.image} alt={product.productName} className="cart-image" />
// //                 <h3>{product.productName}</h3>
// //                 <p>Price: ₹{product.price}</p>
// //               </div>
// //             ))
// //           ) : (
// //             <p>Your cart is empty.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { API_URL, API_PATHS } from '../data/apiPath';
// import axios from 'axios';
// import "../../index.css";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const navigate = useNavigate();
//   const loginToken = localStorage.getItem("token");

//   useEffect(() => {
//     if (!loginToken) {
//       alert("Please login to view your cart.");
//       navigate("/login");
//     } else {
//       const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//       setCart(savedCart);
//     }
//   }, [loginToken, navigate]);

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post(`${API_URL}${API_PATHS.UPDATE_STATS}`, {
//         items: cart,
//       });
//       if (response.data.success) {
//         alert("Payment successful!");
//         localStorage.removeItem("cart");
//         setCart([]);
//         window.location.reload(); // Refresh to update stats
//       }
//     } catch (error) {
//       console.error('Error during payment:', error);
//       alert("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => setIsCartOpen(!isCartOpen)} className="cart-toggle-button">
//         {isCartOpen ? "Close Cart" : "🛒 View Cart"} ({cart.length})
//       </button>
      
//       {isCartOpen && (
//         <div className="cart-container">
//           <header className="cart-header">
//             <h2>Shopping Cart</h2>
//             <Link to="/">← Back to Shop</Link>
//           </header>

//           {cart.length > 0 ? (
//             <>
//               {cart.map((product, index) => (
//                 <div key={index} className="cart-item">
//                   <img src={product.image} alt={product.productName} className="cart-image" />
//                   <h3>{product.productName}</h3>
//                   <p>Price: ₹{product.price}</p>
//                 </div>
//               ))}
//               <button onClick={handlePayment} className="payment-button">
//                 Proceed to Payment
//               </button>
//             </>
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, API_PATHS } from '../data/apiPath';
import axios from 'axios';
import "../../index.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const buyerId = localStorage.getItem("buyerId");

  useEffect(() => {
    if (!buyerId) {
      alert("Please login to view your cart.");
      navigate("/login");
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
    }
  }, [buyerId, navigate]);

  const handlePayment = async () => {
    if (!buyerId) {
      alert("Please login to place an order.");
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      buyerId: buyerId,
      farmerOrders: {},
    };

    // Group orders by farmerId
    cart.forEach((product) => {
      if (!order.farmerOrders[product.farmerId]) {
        order.farmerOrders[product.farmerId] = [];
      }
      order.farmerOrders[product.farmerId].push(product);
    });

    // Save orders in localStorage
    const previousOrders = JSON.parse(localStorage.getItem(`orders_${buyerId}`)) || [];
    localStorage.setItem(`orders_${buyerId}`, JSON.stringify([...previousOrders, order]));

    alert("Order placed successfully!");

    localStorage.removeItem("cart");
    setCart([]);
    navigate("/orders"); // Redirect to Orders page
  };

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
            <>
              {cart.map((product, index) => (
                <div key={index} className="cart-item">
                  <img src={product.image} alt={product.productName} className="cart-image" />
                  <h3>{product.productName}</h3>
                  <p>Price: ₹{product.price}</p>
                  <p>Farmer ID: {product.farmerId}</p>
                </div>
              ))}
              <button onClick={handlePayment} className="payment-button">
                Proceed to Payment
              </button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
