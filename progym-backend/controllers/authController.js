// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Controller: Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Step 1: Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Check if email already exists
    const [existingUser] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Insert the new user into the database
    await db.promise().query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Step 5: Respond with success
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// Controller: Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Check if user exists
    const [userResult] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Step 3: Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 4: Respond with user data (token generation will be added later)
    return res.status(200).json({ 
      message: 'Login successful', 
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
