// File: getSessionsByUser.js
// Path: ./controllers/gymbot/getSessionsByUser.js

const dbFetch = require('../../config/db');
/**
 * getSessionsByUser: Retrieves all sessions and their messages for a specific user.
 * Steps:
 * 1. Validate that userId is provided in the URL parameters
 * 2. Fetch session metadata ordered by creation date
 * 3. For each session, fetch its messages in chronological order
 * 4. Send the combined data back to the client
 */
async function getSessionsByUser(req, res) {
  const { userId } = req.params;

  // Step 1: Validate input
  if (!userId) {
    return res.status(400).json({ error: 'User ID is missing from request.' });
  }

  try {
    // Step 2: Fetch sessions
    const [sessions] = await dbFetch.execute(
      'SELECT id, title, created_at FROM gymbot_sessions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Step 3: Fetch messages for each session
    const sessionsWithMessages = await Promise.all(
      sessions.map(async (session) => {
        const [messages] = await dbFetch.execute(
          'SELECT sender, text FROM gymbot_messages WHERE session_id = ? ORDER BY created_at ASC',
          [session.id]
        );
        return { ...session, messages };
      })
    );

    // Step 4: Return combined data
    res.json(sessionsWithMessages);
  } catch (error) {
    console.error('[GymBot Fetch Error]:', error.message);
    res.status(500).json({ error: 'Could not retrieve session data.' });
  }
}

module.exports = getSessionsByUser;