import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products/all`) // ✅ Updated API endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data.products)) // ✅ Ensure correct key mapping
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h2>Shop</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.productName}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Category: {product.category}</p>
              <img
                src={`${API_URL}/uploads/${product.image}`}
                alt={product.productName}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
