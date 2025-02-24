import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { API_URL } from "../data/apiPath";
import CartSidebar from "../components/CartSidebar";

import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigation
  const loginToken = localStorage.getItem("loginToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (!loginToken) {
      alert("Please login to add products to the cart.");
      return;
    }

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

  const handleCartOpen = () => {
    if (!loginToken) {
      alert("Please login to view your cart.");
      return;
    }
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // ✅ Redirect to BuyerLanding after logout
  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    alert("Logged out successfully!");
    navigate("/Buyerlanding"); // ✅ Redirect after logout
  };

  // ✅ Redirect to BuyerDashboardStats page
  const handleDashboardRedirect = () => {
    navigate("/buyer-dashboard-stats");
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
        <div className="nav-right">
          <button className="cart-button" onClick={handleCartOpen}>
            🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="profile-container" onClick={handleProfileClick}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
              alt="Profile"
              className="profile-pic"
            />
            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <p onClick={handleDashboardRedirect}>Dashboard</p> {/* ✅ Redirect on click */} 
              <p>Orders</p>
              <p>Payments</p>
              <p onClick={handleLogout}>Logout</p> {/* ✅ Logout with redirect */}
            </div>
          </div>
        </div>
      </header>

      {error && <p className="error-message">{error}</p>}

      {/* Products Display Section */}
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

      {/* Cart Sidebar */}
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
