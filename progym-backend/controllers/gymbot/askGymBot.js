// File: askGymBot.js
// Path: ./controllers/gymbot/askGymBot.js

const fetch = require('node-fetch');
const db = require('../../config/db');

/**
 * askGymBot: Receives user message, forwards it to the Gemini API, and returns the response.
 * Steps:
 * 1. Validate that sessionId and message are provided in the request body
 * 2. Save the user's message to the gymbot_messages table
 * 3. Call the Gemini API to generate a reply
 * 4. Parse and sanitize the API response
 * 5. Save the bot's reply to the gymbot_messages table
 * 6. Send the reply back to the client
 */
async function askGymBot(req, res) {
  const { sessionId, message } = req.body;

  // Step 1: Validate input
  if (!sessionId || !message) {
    return res.status(400).json({ reply: 'Missing sessionId or message.' });
  }

  try {
    // Step 2: Save user message
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'user', message]
    );

    // Step 3: Prepare API call
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('GOOGLE_API_KEY is not defined');
      return res.status(500).json({ reply: 'Gemini API key is not configured.' });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] }),
    });

    // Step 4: Parse response
    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
                      'No valid response received. Please try again.';

    // Step 5: Save bot reply
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'bot', replyText]
    );

    // Step 6: Return reply
    res.json({ reply: replyText });
  } catch (error) {
    console.error('[GymBot Error]:', error.message);
    res.status(500).json({ reply: 'An error occurred while generating a response.' });
  }
}

module.exports = askGymBot;