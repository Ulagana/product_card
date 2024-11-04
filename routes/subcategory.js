const express = require('express');
const router = express.Router();
const mongoose= require('mongoose')
const Subcategory = require('../models/Subcategory');


// Create a new subcategory
router.post('/', async (req, res) => {
    try {
        console.log('req.body',req.body);
        const subcategory = new Subcategory(req.body);
        await subcategory.save();
        res.status(201).json(subcategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all subcategories
router.get('/', async (req, res) => {
    try {
        // Find all subcategories and populate the 'catId' field with the 'name' field from the Category collection
        const subcategories = await Subcategory.find({}).populate('catId', 'name');
        
        res.json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a subcategory
router.put('/:id', async (req, res) => {
    try {
        const { name, description, catId } = req.body; // Extract data from the request body

        // Find and update the subcategory
        const subcategory = await Subcategory.findByIdAndUpdate(
            req.params.id,
            { name, description, catId }, // Update fields explicitly
            { new: true, runValidators: true } // Ensure updated document is returned and validation is run
        );

        // If no subcategory was found with the given ID
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Delete a subcategory
router.delete('/:id', async (req, res) => {
    try {
        await Subcategory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
