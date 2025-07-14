// File: loginUser.js
// Path: ./controllers/authentication/loginUser.js

const bcrypt2 = require('bcryptjs');
const db2 = require('../../config/db');

/**
 * loginUser: Authenticates an existing user.
 */
async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Please fill all fields' });
  try {
    const [userResult] = await db2.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userResult.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = userResult[0];
    const isValid = await bcrypt2.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        height_cm: user.height_cm,
        weight_kg: user.weight_kg,
        age: user.age,
        gender: user.gender,
        goal: user.goal
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
}

module.exports = loginUser;