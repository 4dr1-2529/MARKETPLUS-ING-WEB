const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const {
    validateRegistration,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
    validateProfileUpdate
} = require('../middleware/validations');

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);
router.post('/reset-password', validateResetPassword, authController.resetPassword);
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, validateProfileUpdate, authController.updateProfile);
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
