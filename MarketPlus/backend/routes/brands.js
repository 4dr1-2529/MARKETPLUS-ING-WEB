const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', brandController.getAll);
router.get('/admin', authMiddleware, adminMiddleware, brandController.getAllAdmin);
router.post('/', authMiddleware, adminMiddleware, brandController.create);
router.put('/:id', authMiddleware, adminMiddleware, brandController.update);
router.delete('/:id', authMiddleware, adminMiddleware, brandController.deleteBrand);

module.exports = router;
