const express = require('express');
const router = express.Router();
const {
  askGymBot,
  startNewSession,
  getSessionsByUser,
} = require('../controllers/gymbot/gymBot');

// POST /api/gymbot/ask
router.post('/ask', askGymBot);

// POST /api/gymbot/start
router.post('/start', startNewSession);

// GET /api/gymbot/sessions/:userId
router.get('/sessions/:userId', getSessionsByUser);

module.exports = router;
