const fetch = require('node-fetch');
const db = require('../config/db');

// POST /api/gymbot/ask
const askGymBot = async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ reply: 'Missing session or message.' });
  }

  try {
    // Save user's message to DB
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'user', message]
    );

    const API_KEY = process.env.GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Sorry, I didn’t catch that. Try again?';

    // Save bot's reply to DB
    await db.execute(
      'INSERT INTO gymbot_messages (session_id, sender, text) VALUES (?, ?, ?)',
      [sessionId, 'bot', reply]
    );

    res.json({ reply });
  } catch (err) {
    console.error('[GymBot Error]:', err.message);
    res.status(500).json({ reply: 'Error while generating a reply.' });
  }
};

// POST /api/gymbot/start
const startNewSession = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'User ID missing' });

  try {
    const [result] = await db.execute(
      'INSERT INTO gymbot_sessions (user_id, title) VALUES (?, ?)',
      [userId, 'Untitled Chat']
    );
    const sessionId = result.insertId;

    res.json({
      id: sessionId,
      user_id: userId,
      title: 'Untitled Chat',
      messages: [],
      createdAt: new Date(),
    });
  } catch (err) {
    console.error('[GymBot Start Error]:', err.message);
    res.status(500).json({ error: 'Failed to start session.' });
  }
};

// GET /api/gymbot/sessions/:userId
const getSessionsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [sessions] = await db.execute(
      'SELECT id, title, created_at FROM gymbot_sessions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    const sessionsWithMessages = await Promise.all(
      sessions.map(async (session) => {
        const [messages] = await db.execute(
          'SELECT sender, text FROM gymbot_messages WHERE session_id = ? ORDER BY created_at ASC',
          [session.id]
        );
        return {
          ...session,
          messages,
        };
      })
    );

    res.json(sessionsWithMessages);
  } catch (err) {
    console.error('[GymBot Fetch Error]:', err.message);
    res.status(500).json({ error: 'Failed to fetch sessions.' });
  }
};

module.exports = {
  askGymBot,
  startNewSession,
  getSessionsByUser,
};
