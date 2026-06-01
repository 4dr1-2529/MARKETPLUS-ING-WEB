const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const { validateProduct, validateProductUpdate } = require('../middleware/validations');

router.get('/', productController.getAll);
router.get('/destacados', productController.getFeatured);
router.get('/admin/list', authMiddleware, adminMiddleware, productController.getAllAdmin);
router.get('/:slug', productController.getById);
router.post('/', authMiddleware, adminMiddleware, validateProduct, productController.create);
router.put('/:id', authMiddleware, adminMiddleware, validateProductUpdate, productController.update);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
