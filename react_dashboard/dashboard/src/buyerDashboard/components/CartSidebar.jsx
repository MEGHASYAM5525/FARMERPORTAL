

// import React, { useState } from "react";

// const CartSidebar = ({ isCartOpen, toggleCart, cartItems, clearCart }) => {
//   const [isPaymentOpen, setIsPaymentOpen] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//     name: "",
//   });

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const tax = totalPrice * 0.05;
//   const grandTotal = totalPrice + tax;

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//     } else {
//       setIsPaymentOpen(true);
//     }
//   };

//   const handlePaymentChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePayment = () => {
//     const { cardNumber, expiry, cvv, name } = paymentDetails;
//     if (cardNumber && expiry && cvv && name) {
//       alert("Payment Successful! Thank you for your purchase.");
//       const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//       const newOrder = {
//         id: new Date().getTime(), // Unique order ID
//         products: cart, // Store cart items
//         date: new Date().toLocaleString(),
//       };

//     localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
//       clearCart();
//       setIsPaymentOpen(false);
//     } else {
//       alert("Please fill all payment details.");
//     }
//   };

//   return (
//     <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
//       <button onClick={toggleCart} className="close-button">❌</button>
//       <h2>Your Cart</h2>
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item._id} className="cart-item">
//             <p>{item.productName}</p>
//             <p>₹{item.price} x {item.quantity}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty</p>
//       )}
//       <div className="cart-summary">
//         <p>Total: ₹{totalPrice.toFixed(2)}</p>
//         <p>Tax (5%): ₹{tax.toFixed(2)}</p>
//         <p>Grand Total: ₹{grandTotal.toFixed(2)}</p>
//       </div>
//       <div className="cart-actions">
//         <button className="clear-button" onClick={clearCart}>Clear Cart</button>
//         <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
//       </div>

//       {isPaymentOpen && (
//         <div className="payment-section">
//           <h3>Payment</h3>
//           <input
//             type="text"
//             name="cardNumber"
//             placeholder="Card Number"
//             value={paymentDetails.cardNumber}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="expiry"
//             placeholder="Expiry Date (MM/YY)"
//             value={paymentDetails.expiry}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="cvv"
//             placeholder="CVV"
//             value={paymentDetails.cvv}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="name"
//             placeholder="Cardholder Name"
//             value={paymentDetails.name}
//             onChange={handlePaymentChange}
//           />
//           <button onClick={handlePayment}>Pay Now</button>
//           <button onClick={() => setIsPaymentOpen(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartSidebar;



// import React, { useState } from "react";

// const CartSidebar = ({ isCartOpen, toggleCart, cartItems, clearCart }) => {
//   const [isPaymentOpen, setIsPaymentOpen] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//     name: "",
//   });

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const tax = totalPrice * 0.05;
//   const grandTotal = totalPrice + tax;

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//     } else {
//       setIsPaymentOpen(true);
//     }
//   };

//   const handlePaymentChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePayment = () => {
//     const { cardNumber, expiry, cvv, name } = paymentDetails;
//     if (cardNumber && expiry && cvv && name) {
//       alert("Payment Successful! Thank you for your purchase.");

//       const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//       const newOrder = {
//         id: new Date().getTime(), // Unique order ID
//         products: cartItems, // Store cart items
//         totalPrice: grandTotal,
//         date: new Date().toLocaleString(),
//       };

//       localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

//       clearCart();
//       setIsPaymentOpen(false);
//     } else {
//       alert("Please fill all payment details.");
//     }
//   };

//   return (
//     <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
//       <button onClick={toggleCart} className="close-button">❌</button>
//       <h2>Your Cart</h2>
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item._id} className="cart-item">
//             <p>{item.productName}</p>
//             <p>₹{item.price} x {item.quantity}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty</p>
//       )}
//       <div className="cart-summary">
//         <p>Total: ₹{totalPrice.toFixed(2)}</p>
//         <p>Tax (5%): ₹{tax.toFixed(2)}</p>
//         <p>Grand Total: ₹{grandTotal.toFixed(2)}</p>
//       </div>
//       <div className="cart-actions">
//         <button className="clear-button" onClick={clearCart}>Clear Cart</button>
//         <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
//       </div>

//       {isPaymentOpen && (
//         <div className="payment-section">
//           <h3>Payment</h3>
//           <input
//             type="text"
//             name="cardNumber"
//             placeholder="Card Number"
//             value={paymentDetails.cardNumber}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="expiry"
//             placeholder="Expiry Date (MM/YY)"
//             value={paymentDetails.expiry}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="cvv"
//             placeholder="CVV"
//             value={paymentDetails.cvv}
//             onChange={handlePaymentChange}
//           />
//           <input
//             type="text"
//             name="name"
//             placeholder="Cardholder Name"
//             value={paymentDetails.name}
//             onChange={handlePaymentChange}
//           />
//           <button onClick={handlePayment}>Pay Now</button>
//           <button onClick={() => setIsPaymentOpen(false)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartSidebar;



import React, { useState } from "react";

const CartSidebar = ({ isCartOpen, toggleCart, cartItems, clearCart }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
    } else {
      setIsPaymentOpen(true);
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    const { cardNumber, expiry, cvv, name } = paymentDetails;
    const buyerId = localStorage.getItem("buyerId");

    if (!buyerId) {
      alert("Error: Buyer ID not found. Please log in again.");
      return;
    }

    if (cardNumber && expiry && cvv && name) {
      alert("Payment Successful! Thank you for your purchase.");

      const existingOrders = JSON.parse(localStorage.getItem(`orders_${buyerId}`)) || [];
      
      const newOrder = {
        id: new Date().getTime(),
        products: cartItems,
        date: new Date().toLocaleString(),
        totalPrice: grandTotal,
      };

      localStorage.setItem(`orders_${buyerId}`, JSON.stringify([...existingOrders, newOrder]));
      
      clearCart();
      setIsPaymentOpen(false);
    } else {
      alert("Please fill all payment details.");
    }
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <button onClick={toggleCart} className="close-button">❌</button>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <p>{item.productName}</p>
            <p>₹{item.price} x {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <div className="cart-summary">
        <p>Total: ₹{totalPrice.toFixed(2)}</p>
        <p>Tax (5%): ₹{tax.toFixed(2)}</p>
        <p>Grand Total: ₹{grandTotal.toFixed(2)}</p>
      </div>
      <div className="cart-actions">
        <button className="clear-button" onClick={clearCart}>Clear Cart</button>
        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
      </div>

      {isPaymentOpen && (
        <div className="payment-section">
          <h3>Payment</h3>
          <input type="text" name="cardNumber" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={handlePaymentChange} />
          <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" value={paymentDetails.expiry} onChange={handlePaymentChange} />
          <input type="text" name="cvv" placeholder="CVV" value={paymentDetails.cvv} onChange={handlePaymentChange} />
          <input type="text" name="name" placeholder="Cardholder Name" value={paymentDetails.name} onChange={handlePaymentChange} />
          <button onClick={handlePayment}>Pay Now</button>
          <button onClick={() => setIsPaymentOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
