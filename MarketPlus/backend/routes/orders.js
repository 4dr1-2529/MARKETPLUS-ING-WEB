const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const { validateCreateOrder } = require('../middleware/validations');
router.post('/', authMiddleware, validateCreateOrder, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/admin/all', authMiddleware, adminMiddleware, orderController.getAllAdmin);
router.put('/admin/:id/status', authMiddleware, adminMiddleware, orderController.updateStatus);
router.get('/:numero', authMiddleware, orderController.getOrderDetail);

module.exports = router;
