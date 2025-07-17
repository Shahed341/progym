// File: startNewSession.js
// Path: ./controllers/gymbot/startNewSession.js

const dbStart = require('../../config/db');

/**
 * startNewSession: Creates a new GymBot chat session.
 * Steps:
 * 1. Validate that userId is provided in the request body
 * 2. Insert a new record into gymbot_sessions with a default title
 * 3. Send the new session details to the client
 */
async function startNewSession(req, res) {
  const { userId } = req.body;

  // Step 1: Validate input
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    // Step 2: Create new session
    const [result] = await dbStart.execute(
      'INSERT INTO gymbot_sessions (user_id, title) VALUES (?, ?)',
      [userId, 'Untitled Chat']
    );

    // Step 3: Return session data
    res.json({
      id: result.insertId,
      user_id: userId,
      title: 'Untitled Chat',
      messages: [],
      createdAt: new Date()
    });
  } catch (error) {
    console.error('[GymBot Start Error]:', error.message);
    res.status(500).json({ error: 'Failed to create chat session.' });
  }
}

module.exports = startNewSession;