const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

// Route to get full progress summary
router.get('/summary/:userId', progressController.getProgressSummary);

module.exports = router;
