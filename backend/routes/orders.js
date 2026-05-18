const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/:numero', authMiddleware, orderController.getOrderDetail);
router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllAdmin);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus);

module.exports = router;
