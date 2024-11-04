import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pp.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLike = async (productId) => {
    try {
      console.log(`Product ID being liked: ${productId}`);
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}/like`
      );
      console.log("API Response: ", response.data);

      const updatedProducts = products.map((product) =>
        product._id === productId ? response.data : product
      );
      setProducts(updatedProducts);
      fetchProducts();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleRating = async (productId, newRating) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        { rating: newRating }
      );

      console.log("Updated product rating:", response.data);
      fetchProducts();


      setProducts(
        products.map((product) =>
          product._id === productId
            ? { ...product, rating: newRating }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    console.log("Fetching subcategories for categoryId:", categoryId);
    if (!categoryId) {
      console.error("No categoryId provided");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/subcategories/`
      );
      console.log("Subcategories:", response.data);
      const Responsedata = response?.data;
      const filteredData =
        Responsedata &&
        Responsedata.filter((item) => item.catId._id === categoryId);
      setSubcategories(filteredData);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", name);
    productData.append("catId", catId);
    productData.append("subCatId", subCatId);
    productData.append("image", image);
    productData.append("price", price);
    productData.append("timestamp", new Date().toISOString());

    try {
      if (editId) {
        // Update
        const response = await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          productData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Update Response:", response.data);
      } else {
        await axios.post("http://localhost:5000/api/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setName("");
      setCatId("");
      setSubCatId("");
      setImage(null);
      setPrice("");
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setCatId(product.catId?._id || product.catId);
    setSubCatId(product.subCatId?._id || product.subCatId);
    setPrice(product.price); // Set price for editing
    setTimestamp(product.timestamp);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <select
          value={catId}
          onChange={(e) => {
            setCatId(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={subCatId}
          onChange={(e) => setSubCatId(e.target.value)}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option value="">No Subcategories Available</option>
          )}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        {/* New price input field */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Product Price"
          required
        />


        <button type="submit">
          {editId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <ul className="product-list1 d-flex flex-wrap mx-2">
        {products.map((product) => {
          return (
            <li
              className="product-item col-6 col-md-8 col-lg-3 position-relative mx-4 p-4"
              key={product._id}
              style={{ listStyle: "none" }}
            >
              <div className="card ">
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="card-img-top"
                  />
                )}

                {/* Product Information */}
                <div className="card-body ">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="card-text">
                    {product.catId?.name || "No Category"}
                    <span>,</span>
                    {product.subCatId?.name || "No Subcategory"}
                    <div className="product-rating">
                      {[...Array(5)].map((star, index) => (
                        <i
                          key={index}
                          className={`fa m-1 fa-star ${
                            index < (product.rating || 0) ? "checked" : ""
                          }`}
                          style={{
                            color: index < (product.rating || 0) ? "#ffcc00" : "#ccc",
                          }}
                          onClick={() => handleRating(product._id, index + 1)}
                        ></i>
                      ))}
                    </div>
                  </p>


                  <div className="product-info ">
            <p className="product-card__price">
              Price: ${typeof product.price === 'number' && !isNaN(product.price) ? product.price.toFixed(2) : "00.00"}
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-1">
            <span className="text-primary font-weight-bold">
              ${typeof product.price === 'number' && !isNaN(product.price) ? product.price.toFixed(2) : "00.00"}
            </span>

                    <button className="btn btn-primary">Add to Cart</button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <button onClick={() => handleLike(product._id)} className="btn btn-outline-secondary">
                      <i className={`fa ${product.liked ? 'fa-heart' : 'fa-heart-o'}`}></i>
                    </button>
                    <button onClick={() => handleEdit(product)} className="btn btn-primary">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-danger ">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Product;
