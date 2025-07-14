// Folder Structure:
// progym-backend/controllers/authentication/
// ├── registerUser.js
// ├── loginUser.js
// ├── upgradeToPremium.js
// ├── updateProfile.js
// ├── adminController.js
// └── authController.js

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
