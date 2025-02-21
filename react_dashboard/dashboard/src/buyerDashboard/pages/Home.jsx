import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API or sample data
    const sampleProducts = [
      { id: 1, name: "Laptop", price: 50000, vendor: "Dell" },
      { id: 2, name: "Mobile", price: 20000, vendor: "Samsung" },
      { id: 3, name: "Headphones", price: 3000, vendor: "Sony" },
    ];
    setProducts(sampleProducts);
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ₹{product.price} (Vendor: {product.vendor})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
