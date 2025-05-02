// src/controllers/authController.js

const bcrypt = require('bcryptjs'); // For password hashing
const db = require('../config/db'); // MySQL DB connection

///////////////////////////////// Controller: Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Step 1: Ensure all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Check if the email is already registered
    const [existingUser] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Step 3: Securely hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create a new user with role set to 'user' by default
    await db.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    );

    // Step 5: Respond with success confirmation
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

///////////////////////////////// Controller: Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Ensure both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Fetch the user based on email
    const [userResult] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Step 3: Verify entered password matches hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 4: Return user data to frontend (could include JWT or session token later)
    return res.status(200).json({ 
      message: 'Login successful', 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role // Role info is critical for UI control (premium/admin)
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

///////////////////////////////// Controller: Upgrade user to premium
const upgradeToPremium = async (req, res) => {
  const { userId } = req.body;

  // Step 1: Ensure user ID is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  try {
    // Step 2: Update the user role in the database to 'premium'
    await db.promise().query(
      'UPDATE users SET role = ? WHERE id = ?',
      ['premium', userId]
    );

    // Step 3: Respond with a success message
    return res.status(200).json({ message: 'User upgraded to premium' });

  } catch (error) {
    console.error('Error upgrading user:', error);
    return res.status(500).json({ message: 'Server error during upgrade' });
  }
};

// Export all controllers for routing
module.exports = {
  registerUser,
  loginUser,
  upgradeToPremium,
};
