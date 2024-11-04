const express = require("express");
const multer = require("multer"); // Multer for handling file uploads
const Product = require("../models/Product");
const router = express.Router();
const fs = require("fs");
const path = require("path");


// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});
const upload = multer({ storage: storage });

// Create a new product with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Uploaded file:", req.file); // Log uploaded file details

    const productData = {
      name: req.body.name,
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      image: req.file ? req.file.filename : null,
      price:req.body.price,
      timestamp: req.body.timestamp,
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    console.log("Saved Product:", savedProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("catId subCatId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const existingProduct = await Product.findById(req.params.id);

    const productData = {
      name: req.body.name,
      catId: req.body.catId,
      subCatId: req.body.subCatId,
      image: req.file ? req.file.filename : existingProduct.image, // Use new image or keep the old one
      timestamp: req.body.timestamp,
      price:req.body.price,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.join(__dirname, "../uploads/", product.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image file:", err);
      }
    });

    // Delete the product from the database.
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product and associated image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id/like', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send('Product not found');

  product.liked = !product.liked;     // Toggle like
  await product.save();
  res.send(product);          // Make sure the updated product is returned
});



module.exports = router;
