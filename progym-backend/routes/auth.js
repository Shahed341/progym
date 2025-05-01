// src/routes/auth.js

const express = require('express');
const router = express.Router();

// Import controller functions
const { registerUser, loginUser, upgradeToPremium } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
router.post('/login', loginUser);

// @route   POST /api/auth/upgrade
// @desc    Upgrade user to premium role
// @access  Public (should be protected in real apps)
router.post('/upgrade', upgradeToPremium);

module.exports = router;
