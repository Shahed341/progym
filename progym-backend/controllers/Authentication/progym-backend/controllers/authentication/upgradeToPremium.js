// File: upgradeToPremium.js
// Path: ./controllers/authentication/upgradeToPremium.js

const db3 = require('../../config/db');

/**
 * upgradeToPremium: Elevates a user's role to 'premium'.
 */
async function upgradeToPremium(req, res) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: 'User ID required' });
  try {
    await db3.execute('UPDATE users SET role = ? WHERE id = ?', ['premium', userId]);
    return res.status(200).json({ message: 'User upgraded to premium' });
  } catch (error) {
    console.error('Upgrade error:', error);
    return res.status(500).json({ message: 'Server error during upgrade' });
  }
}

module.exports = upgradeToPremium;