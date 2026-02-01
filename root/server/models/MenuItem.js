const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    index: true 
  },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'] 
  },
  price: { type: Number, required: true },
  ingredients: [String],
  isAvailable: { type: Boolean, default: true },
  preparationTime: { type: Number }, // In minutes
  imageUrl: { type: String }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

// CRITICAL: This index allows the search API to work by name/ingredients
menuItemSchema.index({ name: 'text', ingredients: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);