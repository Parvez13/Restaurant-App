const express = require('express');
const router = express.Router();
const menuCtrl = require('../controllers/menuController');

router.get('/', menuCtrl.getMenu);
router.get('/search', menuCtrl.searchMenu); // Make sure this is BEFORE /:id
router.get('/:id', menuCtrl.getMenuById);
router.post('/', menuCtrl.createMenuItem);
router.put('/:id', menuCtrl.updateMenuItem);
router.delete('/:id', menuCtrl.deleteMenuItem);
router.patch('/:id/availability', menuCtrl.toggleAvailability);

module.exports = router;