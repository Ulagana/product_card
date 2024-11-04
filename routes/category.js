
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Category Schema
const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
}, {
  timestamps: true,
});

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Create a category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).send({ success: false, message: "Category name is required" });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();
    

    res.status(201).send({ success: true, message: "Category created", data: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// router.post('/', async (req, res) => {
//   try {
//       const category = await Category.findById(req.body.cat_id);
//       if (!category) {
//           return res.status(404).json({ message: 'Category not found' });
//       }
      
//       const subcategory = new Subcategory(req.body);
//       await subcategory.save();
//       res.status(201).json(subcategory);
//   } catch (err) {
//       console.error(err);
//       res.status(400).json({ message: err.message });
//   }
// });

// Read categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});


// Update a category
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }

    // Update the category fields
    category.name = name || category.name; // Update if provided, otherwise keep old value
    category.description = description || category.description;

    // Save the updated category
    const updatedCategory = await category.save();

    res.status(200).send({ success: true, message: "Category updated", data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});


// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }

    res.status(200).send({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;
