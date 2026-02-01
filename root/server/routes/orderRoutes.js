const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');

// Define Order Routes
router.get('/', orderCtrl.getOrders);
router.get('/:id', orderCtrl.getOrderById);
router.post('/', orderCtrl.createOrder);
router.patch('/:id/status', orderCtrl.updateOrderStatus);

module.exports = router;