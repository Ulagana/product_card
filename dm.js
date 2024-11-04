const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const subcategoryRoutes = require("./routes/subcategory");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Product routes
app.use("/api/products", productRoutes);

// Register category routes
app.use("/api/categories", categoryRoutes); // Use the category routes
app.use("/api/products", productRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
