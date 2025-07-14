// File: authController.js
// Path: ./controllers/authentication/authController.js

const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const upgradeToPremium = require('./upgradeToPremium');
const updateProfile = require('./updateProfile');
const adminController = require('./adminController');

module.exports = {
  registerUser,
  loginUser,
  upgradeToPremium,
  updateProfile,
  ...adminController
};
