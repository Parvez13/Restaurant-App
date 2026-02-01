const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    unique: true, 
    required: true 
  },
  items: [{
    menuItem: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'MenuItem', 
      required: true 
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  customerName: { type: String, required: true },
  tableNumber: { type: Number, required: true }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);