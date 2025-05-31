// File: progym-backend/controllers/gymbotController.js

const fetch = require('node-fetch'); // Used to send HTTP requests to Gemini API

// --- TASK: Handle chat message to GymBot ---
const askGymBot = async (req, res) => {
  // Step 1: Extract user message from the request body
  const { message } = req.body;

  // Step 2: Validate that the message exists
  if (!message) {
    return res.status(400).json({ reply: 'No message provided.' });
  }

  try {
    // Step 3: Prepare Gemini API endpoint using your API key from .env
    const API_KEY = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // Step 4: Send POST request to Gemini API with user's message
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    // Step 5: Parse the JSON response from Gemini
    const data = await response.json();

    // Step 6: (Optional) Log the full API response for debugging
    console.log('[GymBot] Gemini API response:', JSON.stringify(data, null, 2));

    // Step 7: Extract and format the reply text from Gemini response
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Sorry, I could not understand the input.';

    // Step 8: Send the reply back to the frontend
    res.json({ reply });

  } catch (error) {
    // Step 9: Handle request failure and send error response
    console.error('[GymBot] Error calling Google API:', error.message);
    res.status(500).json({ reply: 'Error processing your request.' });
  }
};

module.exports = { askGymBot }; // Export controller function
