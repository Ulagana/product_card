import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./h.css"; // Assuming you have a CSS file for styling

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDoubleClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCartClick = (product) => {
    setSelectedProduct(product);
    setShowCartPopup(true);
    setQuantity(1);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  const calculateTotal = () => {
    return selectedProduct
      ? (quantity * selectedProduct.price).toFixed(2)
      : "0.00";
  };
  const handleProductListClick = () => {
    navigate("/list");
  };

  const  handleProductListClick1 = () => {
    navigate("/leo");
  };

 

  const handleConfirmClick = () => {
    const cartItem = {
      id: selectedProduct._id, // MongoDB uses _id for products
      name: selectedProduct.name,
      category: selectedProduct.catId?.name || "No Category",
      subcategory: selectedProduct.subCatId?.name || "No Subcategory",
      quantity: quantity, // The quantity you are adding
      price: parseFloat(selectedProduct.price?.toFixed(2)) || 144.0,
      total: calculateTotal(), // The total price for this product (price * quantity)
      image: selectedProduct.image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingProductIndex !== -1) {
      const existingProduct = existingCart[existingProductIndex];
      existingProduct.quantity += cartItem.quantity;
      existingProduct.total = (
        existingProduct.quantity * existingProduct.price
      ).toFixed(2);
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Successfully added to cart!");
    setShowCartPopup(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 className="he">Welcome to Products</h1>
        <button className="leo" onClick={handleProductListClick}>
          LIST OF PRODUCTS
        </button>  <br />  <br />
        <button className="leo" onClick={handleProductListClick1}>
          Fist in out
        </button>
        <br />
        <hr />

        <ul className="product-list d-flex flex-wrap mx-2 px-1">
          {products.map((product) => (
            <li
              className="product-item col-6 col-md-6 col-lg-4 position-relative mx-4 p-4"
              key={product._id}
              style={{ listStyle: "none" }}
              onDoubleClick={() => handleDoubleClick(product)} // Open side panel on double click
            >
              <div className="card">
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="card-text mb-0">
                    {product.catId?.name || "No Category"}
                    <span>,</span>
                    {product.subCatId?.name || "No Subcategory"}
                  </p>
                  <div className="product-rating px-0 mx-1">
                    {[...Array(5)].map((star, index) => (
                      <i
                        key={index}
                        className={`fa m-1 fa-star ${
                          index < (product.rating || 0) ? "checked" : ""
                        }`}
                        style={{
                          color:
                            index < (product.rating || 0) ? "#ffcc00" : "#ccc",
                        }}
                      ></i>
                    ))}
                  </div>
                  <div className="product-info">
                    <p className="product-card__price">
                      Price: ${product.price?.toFixed(2) || "144.00"}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-primary font-weight-bold">
                      ${product.price?.toFixed(2) || "144.00"}
                    </span>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Panel for Product Details */}
      <div
        className="product-details-panel"
        style={{
          width: "30%",
          padding: "20px",
          borderLeft: "1px solid #ccc",
          display: selectedProduct ? "block" : "none",
        }}
      >
        {selectedProduct && (
          <div className="panel-content">
            <span className="close" onClick={closeDetails}>
              &times;
            </span>
            <h2>{selectedProduct.name}</h2>
            <div className="product-image">
              <img
                src={`http://localhost:5000/uploads/${selectedProduct.image}`}
                alt={selectedProduct.name}
                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              />
            </div>
            <p>Category: {selectedProduct.catId?.name || "No Category"}</p>
            <p>
              Subcategory: {selectedProduct.subCatId?.name || "No Subcategory"}
            </p>
            <p>
              Description:{" "}
              {selectedProduct.description || "No Description Available"}
            </p>
            <p>Price: ${selectedProduct.price?.toFixed(2) || "144.00"}</p>
            <div className="d-flex ">
              <button
                className="btn btn-primary mx-2 p-2 "
                onClick={() => handleCartClick(selectedProduct)}
              >
                Add to Cart
              </button>
              <button className="btn btn-secondary  mx-2 p-2 ml-2">
                Add to Favorite
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Optional: Cart Popup (if needed) */}
      {showCartPopup && selectedProduct && (
        <div className="cart-popup">
          <div className="cart-content">
            <span className="close" onClick={() => setShowCartPopup(false)}>
              &times;
            </span>
            <h2>{selectedProduct.name}</h2>
            <p>Category: {selectedProduct.catId?.name || "No Category"}</p>
            <p>
              Subcategory: {selectedProduct.subCatId?.name || "No Subcategory"}
            </p>

            {/* Quantity Input */}
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: "60px", marginLeft: "10px" }}
            />

            <p>Price: ${selectedProduct.price?.toFixed(2) || "144.00"}</p>
            <hr />
            <p>
              <strong>Total: ${calculateTotal()}</strong>
            </p>
            <div className="d-flex">
              <button
                className="btn btn-primary mx-2 p-2"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary  mx-2 p-2 ml-2"
                onClick={() => setShowCartPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
