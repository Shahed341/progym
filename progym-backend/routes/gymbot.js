// routes/gymbot.js
const express = require('express');
const router = express.Router();
const { askGymBot } = require('../controllers/gymbotController');

// Route for POST /api/gymbot/ask
router.post('/ask', askGymBot);

module.exports = router;
