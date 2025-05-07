// progym-backend/controllers/gymbotController.js

const fetch = require('node-fetch');

const askGymBot = async (req, res) => {
  const { message } = req.body;

  // // Log the received user message
  // console.log('[GymBot] Received message:', message);

  if (!message) {
    return res.status(400).json({ reply: 'No message provided.' });
  }

  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // Send request to Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();

    // Log full Gemini API response for debugging
    console.log('[GymBot] Gemini API response:', JSON.stringify(data, null, 2));

    // Extract the reply safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Sorry, I could not understand the input.';

    // Send reply back to frontend
    res.json({ reply });

  } catch (error) {
    console.error('[GymBot] Error calling Google API:', error.message);
    res.status(500).json({ reply: 'Error processing your request.' });
  }
};

module.exports = { askGymBot };
