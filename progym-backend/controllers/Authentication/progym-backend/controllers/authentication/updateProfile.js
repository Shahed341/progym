// File: updateProfile.js
// Path: ./controllers/authentication/updateProfile.js

const db4 = require('../../config/db');

/**
 * updateProfile: Updates basic profile fields for a user.
 */
async function updateProfile(req, res) {
  const { id } = req.params;
  const { username, height_cm, weight_kg, age, gender, goal } = req.body;
  if (!username || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Missing profile fields' });
  }
  try {
    await db4.execute(
      `UPDATE users
       SET username = ?, height_cm = ?, weight_kg = ?, age = ?, gender = ?, goal = ?
       WHERE id = ?`,
      [username, height_cm, weight_kg, age, gender, goal, id]
    );
    return res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ message: 'Server error during profile update' });
  }
}

module.exports = updateProfile;
