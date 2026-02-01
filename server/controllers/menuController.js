const MenuItem = require('../models/MenuItem');

// 1. GET ALL - With Optional Filters (Category, Availability, Price Range)
exports.getMenu = async (req, res) => {
    try {
        const { category, isAvailable, minPrice, maxPrice } = req.query;
        let query = {};

        if (category) query.category = category;
        if (isAvailable) query.isAvailable = isAvailable === 'true';
        
        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const items = await MenuItem.find(query);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. SEARCH - By Name or Ingredients (Requires Text Index)
exports.searchMenu = async (req, res) => {
    try {
        const { q } = req.query;
        const items = await MenuItem.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. GET SINGLE - By ID
exports.getMenuById = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. POST - Create New Item
exports.createMenuItem = async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 5. PUT - Update Item
exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// 6. DELETE - Remove Item
exports.deleteMenuItem = async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 7. PATCH - Toggle Availability
exports.toggleAvailability = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        
        item.isAvailable = !item.isAvailable;
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};