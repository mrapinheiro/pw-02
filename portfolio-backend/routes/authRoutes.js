const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', [
    body('username').isLength({ min: 1 }).withMessage('Username must be at least 1 character'),
    body('password').isLength({ min: 1 }).withMessage('Password must be at least 1 character'),
    body('role').optional().isIn(['admin', 'guest']),
], register);

// Login route
router.post('/login', [
    body('username').notEmpty(),
    body('password').notEmpty(),
], login);

module.exports = router;
