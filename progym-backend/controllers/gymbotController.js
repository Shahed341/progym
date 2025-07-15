// File: gymbotController.js
// Path: ./progym-backend/controllers/gymbotController.js

// Import node-fetch for making HTTP requests to the external API
const fetch = require('node-fetch');
// Import database utility for storing and retrieving chat data
const db = require('../config/db');

/**
 * askGymBot: Handles user messages and forwards them to the Gemini API for a response.
 * 1. Validate that both sessionId and message are provided
 * 2. Persist the user's message to gymbot_messages table
 * 3. Call external Gemini API to generate a bot reply
 * 4. Extract and sanitize the reply text
 * 5. Persist the bot's reply to gymbot_messages table
 * 6. Return the reply to the client
 */
const askGymBot = async (req, res) => {
  const { sessionId, message } = req.body;

  // Step 1: Ensure we have the necessary data from client
  if (!sessionId || !message) {
    return res.status(400).json({ reply: '❗ Missing session ID or message.' });
  }

  try {
    // Step 2: Store the user's message in the database
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'user', message]
    );

    // Retrieve API key from environment; guard against missing key
    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
      console.error('❌ Missing GOOGLE_API_KEY');
      return res.status(500).json({ reply: 'Gemini API key not configured.' });
    }

    // Step 3: Format request to Gemini API endpoint
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    // Step 4: Parse and extract the generated text
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const finalReply = reply || '🤖 Sorry, I didn’t catch that. Try again?';

    // Step 5: Store the bot's reply in the database
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'bot', finalReply]
    );

    // Step 6: Send the reply back to the client
    res.json({ reply: finalReply });
  } catch (err) {
    console.error('[GymBot Error]:', err.message);
    res.status(500).json({ reply: '❌ An error occurred while generating a response.' });
  }
};

/**
 * startNewSession: Creates a new chat session record for a user.
 * 1. Validate that userId is provided
 * 2. Insert a new gymbot_sessions row with default title
 * 3. Respond with session details
 */
const startNewSession = async (req, res) => {
  const { userId } = req.body;

  // Step 1: Check for userId
  if (!userId) {
    return res.status(400).json({ error: '❗ User ID is required.' });
  }

  try {
    // Step 2: Insert session into gymbot_sessions table
    const [result] = await db.execute(
      'INSERT INTO gymbot_sessions (user_id, title) VALUES (?, ?)',
      [userId, 'Untitled Chat']
    );

    // Step 3: Return the new session data to the client
    res.json({
      id: result.insertId,
      user_id: userId,
      title: 'Untitled Chat',
      messages: [],
      createdAt: new Date(),
    });
  } catch (err) {
    console.error('[GymBot Start Error]:', err.message);
    res.status(500).json({ error: '❌ Failed to create chat session.' });
  }
};

/**
 * getSessionsByUser: Retrieves all chat sessions and their messages for a given user.
 * 1. Validate that userId is provided in URL params
 * 2. Fetch session metadata ordered by newest first
 * 3. For each session, fetch its messages in chronological order
 * 4. Return combined data structure
 */
const getSessionsByUser = async (req, res) => {
  const { userId } = req.params;

  // Step 1: Ensure userId parameter is present
  if (!userId) {
    return res.status(400).json({ error: '❗ User ID missing from request.' });
  }

  try {
    // Step 2: Retrieve all sessions for this user
    const [sessions] = await db.execute(
      'SELECT id, title, created_at FROM gymbot_sessions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Step 3: Fetch messages for each session in parallel
    const sessionsWithMessages = await Promise.all(
      sessions.map(async (session) => {
        const [messages] = await db.execute(
          'SELECT sender, text FROM gymbot_messages WHERE session_id = ? ORDER BY created_at ASC',
          [session.id]
        );
        return { ...session, messages };
      })
    );

    // Step 4: Send the sessions and nested messages back to client
    res.json(sessionsWithMessages);
  } catch (err) {
    console.error('[GymBot Fetch Error]:', err.message);
    res.status(500).json({ error: '❌ Could not retrieve session data.' });
  }
};

// Export all gymbot controller functions for use in route definitions
module.exports = {
  askGymBot,
  startNewSession,
  getSessionsByUser,
};
