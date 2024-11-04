const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    catId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
