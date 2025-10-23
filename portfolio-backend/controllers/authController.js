const { validationResult } = require('express-validator');
const { findUserByUsername, createUser, validatePassword } = require('../models/userModel');
const { generateToken } = require('../utils/tokenUtils');
const config = require('../config/serverConfig');

const register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    if (findUserByUsername(username)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = createUser(username, password, role || 'guest');
    // Don't send password back
    const userObj = { username: newUser.username, role: newUser.role };

    const token = generateToken(userObj, config.jwtSecret);
    res.json({ message: 'User registered successfully', token });
};

const login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (!user || !validatePassword(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const userObj = { username: user.username, role: user.role };
    const token = generateToken(userObj, config.jwtSecret);
    res.json({ token });
};

module.exports = {
    register,
    login,
};
