import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productsHandler = async () => {
        const firmId = localStorage.getItem("firmId");
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert("Failed to fetch products");
        }
    };

    useEffect(() => {
        productsHandler();
    }, []);

    return (
        <div className="productSection">
            {!products.length ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;