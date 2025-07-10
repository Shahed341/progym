const express = require('express');
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  upgradeToPremium,
  updateProfile, // 👈 add this
} = require('../controllers/authController');

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

// @route   PUT /api/auth/update-profile/:id
// @desc    Update user profile data
// @access  Public (should be protected in real apps)
router.put('/update-profile/:id', updateProfile);

module.exports = router;
