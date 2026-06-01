const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.use(authMiddleware, adminMiddleware);

router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id', adminController.updateUser);
router.get('/inventory', adminController.getInventory);
router.put('/inventory/batch', adminController.updateInventoryBatch);
router.put('/inventory/:id', adminController.updateInventory);
router.get('/reports', adminController.getReports);

module.exports = router;
