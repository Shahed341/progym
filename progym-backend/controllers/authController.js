// File: controllers/authController.js

const bcrypt = require('bcryptjs'); // For securely hashing passwords
const db = require('../config/db'); // MySQL DB connection pool


// --- TASK 1: Register a new user ---
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Step 1: Validate required input fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Check if the email already exists in the database
    const [existingUser] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Step 3: Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Insert new user into the users table with default role 'user'
    await db.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    );

    // Step 5: Respond with success
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};


// --- TASK 2: Login an existing user ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Look up the user by email
    const [userResult] = await db.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];

    // Step 3: Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 4: Return user info to frontend (you can add token/session later)
    return res.status(200).json({ 
      message: 'Login successful', 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};


// --- TASK 3: Upgrade a user to premium role ---
const upgradeToPremium = async (req, res) => {
  const { userId } = req.body;

  // Step 1: Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  try {
    // Step 2: Update user role to 'premium' in the database
    await db.promise().query(
      'UPDATE users SET role = ? WHERE id = ?',
      ['premium', userId]
    );

    // Step 3: Send success response
    return res.status(200).json({ message: 'User upgraded to premium' });

  } catch (error) {
    console.error('Upgrade error:', error);
    return res.status(500).json({ message: 'Server error during upgrade' });
  }
};

// Export controller functions
module.exports = {
  registerUser,
  loginUser,
  upgradeToPremium,
};
