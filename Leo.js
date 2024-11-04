import React, { useState, useEffect } from "react";
import "./li.css";

function Leo() {
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    price: '',
    action: 'add',
  });

  const [products, setProducts] = useState([]);
  const [takenProducts, setTakenProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const storedTakenProducts = JSON.parse(localStorage.getItem('taken'))
    setProducts(storedProducts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProductAction = () => {
    if (form.action === 'add') {
      handleAddProduct();
    } else if (form.action === 'take') {
      handleTakeOutProduct();
    }
  };

  const handleAddProduct = () => {
    const totalPrice = form.quantity * form.price;
    const newProduct = {
      id: form.id,
      productId: form.productId,
      quantity: parseInt(form.quantity),  // Ensure quantity is a number
      price: parseFloat(form.price),      // Ensure price is a number
      totalPrice: totalPrice,
    };

    const updatedProducts = [...products, newProduct]; 
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    setForm({ productId: '', quantity: '', price: '', action: 'add' });
  };



    // first in first out

  // const handleTakeOutProduct = () => {
  //   const takeQuantity = parseInt(form.quantity);
  //   const targetProductId = form.productId;

  //   if (isNaN(takeQuantity) || takeQuantity <= 0) {
  //     alert('Please enter a valid quantity to take out.');
  //     return;
  //   }

  //   let remainingQuantity = takeQuantity;
  //   let updatedProducts = [...products];
  //   let takenList = [...takenProducts]; //Temporary array to track taken products

  //   let productIndex = updatedProducts.findIndex(
  //     (product) => product.productId === targetProductId
  //   );

  //   if (productIndex === -1) {
  //     alert('Product ID not found.');
  //     return;
  //   }

  //   while (remainingQuantity > 0 && productIndex !== -1) {
  //     let currentProduct = updatedProducts[productIndex];

  //     if (currentProduct.quantity <= remainingQuantity) {
  //       remainingQuantity -= currentProduct.quantity;
  //       takenList.push(currentProduct);  // Add fully taken product to the list
  //       updatedProducts.splice(productIndex, 1); 
  //     } else {
  //       const takenProduct = {
  //         ...currentProduct,
  //         quantity: remainingQuantity,
  //         totalPrice: remainingQuantity * currentProduct.price,
  //       };
  //       takenList.push(takenProduct);  // Add partially taken product to the list
  //       currentProduct.quantity -= remainingQuantity;
  //       currentProduct.totalPrice = currentProduct.quantity * currentProduct.price;
  //       remainingQuantity = 0; 
  //     }

  //     productIndex = updatedProducts.findIndex(
  //       (product) => product.productId === targetProductId
        
  //     );
  //   }

  //   setProducts(updatedProducts);
  //   setTakenProducts(takenList); 
  //   localStorage.setItem('products', JSON.stringify(updatedProducts));
  //   localStorage.setItem('taken', JSON.stringify(updatedProducts));

  //   setForm({ productId: '', quantity: '', price: '', action: 'add' });
  // };





  const handleTakeOutProduct = () => {
    const takeQuantity = parseInt(form.quantity);  // first in  lastout
    const targetProductId = form.productId;

    if (isNaN(takeQuantity) || takeQuantity <= 0) {
        alert('Please enter a valid quantity to take out.');
        return;
    }

    let remainingQuantity = takeQuantity;
    let updatedProducts = [...products];
    let takenList = [...takenProducts];

    let productIndex = updatedProducts.findIndex(
          (product) => product.productId === targetProductId
        );

        if (productIndex === -1) {
          alert('Product ID not found.');
          return;
        }

    // Start from the end of the products array
    for (let productIndex = updatedProducts.length - 1; productIndex >= 0; productIndex--) {
        let currentProduct = updatedProducts[productIndex];

        if (currentProduct.productId === targetProductId) {
            if (currentProduct.quantity <= remainingQuantity) {
                remainingQuantity -= currentProduct.quantity;
                takenList.push(currentProduct);
                updatedProducts.splice(productIndex, 1);
            } else {
                const takenProduct = {
                    ...currentProduct,
                    quantity: remainingQuantity,
                    totalPrice: remainingQuantity * currentProduct.price,
                };
                takenList.push(takenProduct);
                currentProduct.quantity -= remainingQuantity;
                currentProduct.totalPrice = currentProduct.quantity * currentProduct.price;
                remainingQuantity = 0;
            }

            // Exit the loop if we've taken out the required quantity
            if (remainingQuantity <= 0) {
                break;
            }
        }
    }

    setProducts(updatedProducts);
    setTakenProducts(takenList);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    localStorage.setItem('taken', JSON.stringify(takenList));


    setForm({ productId: '', quantity: '', price: '', action: 'add' });
};

  return (
    <div className="container">
      <div className="form-container">
        <h2>Add or Take Products</h2>
        <form>
          <div>
            <label>Product ID:</label>
            <input
              type="text"
              name="productId"
              value={form.productId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="action"
                value="add"
                checked={form.action === "add"}
                onChange={handleInputChange}
              />
              Add
            </label>
            <label>
              <input
                type="radio"
                name="action"
                value="take"
                checked={form.action === "take"}
                onChange={handleInputChange}
              />
              Take
            </label>
          </div>
          <button type="button" onClick={handleProductAction}>
            {form.action === "add" ? "Add Product" : "Take Product"}
          </button>
        </form>
      </div>

      {/* Right Side: Products List */}
      <div className="products-container">
        <h2>Products List</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="my-3 px-2">Taken Products List</h2>
        <table >
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {takenProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leo;
