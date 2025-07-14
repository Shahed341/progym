// File: registerUser.js
// Path: ./controllers/authentication/registerUser.js

const bcrypt = require('bcryptjs');
const db = require('../../config/db');

/**
 * registerUser: Handles user sign-up.
 */
async function registerUser(req, res) {
  const { username, email, password, height_cm, weight_kg, age, gender, goal } = req.body;
  if (!username || !email || !password || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      `INSERT INTO users (username, email, password, role, height_cm, weight_kg, age, gender, goal)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, 'user', height_cm, weight_kg, age, gender, goal]
    );
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
}

module.exports = registerUser;