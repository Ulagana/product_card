import React, { useEffect, useState } from "react";
import "./n.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + parseFloat(item.total), 0)
      .toFixed(2);
  };

  const handleDelete = (id) => {

    const filteredItems = cartItems.filter(item => item.id !== id);

    setCartItems(filteredItems);

    localStorage.setItem("cart", JSON.stringify(filteredItems));

    alert("Item successfully deleted from cart");
  };


  return (
    <div className="checkout-container" style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: "570", fontSize: "32px" }}>LIST OF CARDS</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Image</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Product
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Category
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Subcategory
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Quantity
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Price
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Total
                </th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                 <td style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
                    <img 
                      src={`http://localhost:5000/uploads/${item.image}`} // Update with correct path to the image
                      alt={item.name} 
                      style={{ borderRadius: "60%", width: "60px", height: "60px" }} 
                    />
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {item.name}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {item.category}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {item.subcategory}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    {item.quantity}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    ${item.price}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    ${item.total}
                  </td>

                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                    <button onClick={() => handleDelete(item.id)} style={{ color: "white",fontWeight:"300%", backgroundColor:"red"}}>
                             Delete
                                </button>  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="bbb" style={{ marginTop: "30px" }}>
            Grand Total: ${calculateTotal()}
          </h2>
        </>
      )}
    </div>
  );
};

export default Checkout;
