// import React, { useEffect, useState } from "react";
// import { API_URL } from "../data/apiPath";
// import CartSidebar from "../components/CartSidebar";
// import "./Shop.css";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false); // Sidebar state

//   // Fetch products from API
//   useEffect(() => {
//     fetch(`${API_URL}/product/all`)
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   // Load cart from local storage on mount
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(savedCart);
//   }, []);

//   // Add product to cart with quantity update
//   const addToCart = (product) => {
//     const existingItem = cart.find((item) => item._id === product._id);

//     let updatedCart;
//     if (existingItem) {
//       updatedCart = cart.map((item) =>
//         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//     } else {
//       updatedCart = [...cart, { ...product, quantity: 1 }];
//     }

//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to local storage
//   };

//   return (
//     <div>
//       <header className="shop-header">
//         <h2>Shop</h2>
//         {/* Cart Button Opens Sidebar */}
//         <button className="cart-button" onClick={() => setIsCartOpen(true)}>
//           🛒 Cart ({cart.length})
//         </button>
//       </header>

//       <div className="product-list">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="product-card">
//               <img
//                 src={`${API_URL}/uploads/${product.image}`}
//                 alt={product.productName}
//                 className="product-image"
//               />
//               <h3>{product.productName}</h3>
//               <p><strong>Price:</strong> ₹{product.price}</p>
//               <p><strong>Category:</strong> {product.category}</p>
//               <p><strong>Firm:</strong> {product.firm.firmName}</p>
//               <button className="add-to-cart" onClick={() => addToCart(product)}>
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Loading products...</p>
//         )}
//       </div>

//       {/* Cart Sidebar */}
//       <CartSidebar 
//         isCartOpen={isCartOpen} 
//         toggleCart={() => setIsCartOpen(false)} 
//         cartItems={cart} 
//       />
//     </div>
//   );
// };

// export default Shop;

import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import CartSidebar from "../components/CartSidebar";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
  useEffect(() => {
    fetch(`${API_URL}/product/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data.products))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
      });
  }, []);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to local storage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="shop-header">
        <h2>Shop</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="cart-button" onClick={() => setIsCartOpen(true)}>
          🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.productName}
                className="product-image"
              />
              <h3>{product.productName}</h3>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Firm:</strong> {product.firm.firmName}</p>
              <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <CartSidebar
        isCartOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(false)}
        cartItems={cart}
        clearCart={() => setCart([])}
      />
    </div>
  );
};

export default Shop;
