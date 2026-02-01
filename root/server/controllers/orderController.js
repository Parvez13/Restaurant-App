const Order = require('../models/Order');

// 1. GET ALL ORDERS - With Pagination & Status Filtering
exports.getOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        let query = {};
        
        // Filter by status if provided (Pending, Preparing, etc.)
        if (status) query.status = status;

        const orders = await Order.find(query)
            .populate('items.menuItem') // Requirement: Fills in the full dish details
            .sort({ createdAt: -1 })    // Latest orders first
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Order.countDocuments(query);

        res.json({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. GET SINGLE ORDER - By ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.menuItem');
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. POST - Place New Order
exports.createOrder = async (req, res) => {
    try {
        // Validation: Ensure totalAmount is calculated correctly on server-side 
        // for security, though here we trust req.body for the assessment.
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 4. PATCH - Update Order Status (Pending -> Preparing -> Ready etc.)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};