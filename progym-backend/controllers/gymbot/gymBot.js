// Folder Structure:
// progym-backend/controllers/gymbot/
// ├── askGymBot.js
// ├── startNewSession.js
// ├── getSessionsByUser.js
// └── gymBot.js
// 

// File: gymBot.js
// Path: ./controllers/gymbot/gymBot.js

const askGymBot = require('./askGymBot');
const startNewSession = require('./startNewSession');
const getSessionsByUser = require('./getSessionsByUser');

module.exports = { askGymBot, startNewSession, getSessionsByUser };