// File: authController.js
// Path: ./progym-backend/controllers/authController.js

// Import bcryptjs for hashing passwords and comparing hashes
const bcrypt = require('bcryptjs');
// Import our database utility module for executing queries
const db = require('../config/db');

// --- TASK 1: Register a new user ---
/**
 * registerUser: Handles user sign-up.
 * 1. Validate all required fields are present
 * 2. Check if the email is already in use
 * 3. Hash the password securely
 * 4. Insert the new user record into the database
 * 5. Respond with appropriate HTTP status and message
 */
const registerUser = async (req, res) => {
  // Destructure expected fields from the request body
  const {
    username,
    email,
    password,
    height_cm,
    weight_kg,
    age,
    gender,
    goal
  } = req.body;

  // Step 1: Ensure no required field is missing
  if (!username || !email || !password || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Step 2: Look up existing users by email
    const [existingUser] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // If any user exists with this email, reject registration
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Step 3: Hash the plain-text password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Insert the new user, defaulting role to 'user'
    await db.execute(
      `INSERT INTO users
       (username, email, password, role, height_cm, weight_kg, age, gender, goal)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, 'user', height_cm, weight_kg, age, gender, goal]
    );

    // Step 5: Send success response
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    // Log unexpected errors and send server error response
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// --- TASK 2: Login an existing user ---
/**
 * loginUser: Authenticates an existing user.
 * 1. Validate required fields
 * 2. Fetch user record by email
 * 3. Compare provided password with stored hash
 * 4. Return user data on success
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Check presence of login credentials
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    // Step 2: Retrieve the user by email
    const [userResult] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // If no user found, send error
    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];
    // Step 3: Verify password against hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 4: Respond with user info (excluding password)
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
};

// --- TASK 3: Upgrade user to premium ---
/**
 * upgradeToPremium: Elevates a user's role to 'premium'.
 * 1. Validate presence of userId
 * 2. Update the 'role' field in the users table
 */
const upgradeToPremium = async (req, res) => {
  const { userId } = req.body;

  // Step 1: Ensure userId is provided
  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  try {
    // Step 2: Execute update query to set role = 'premium'
    await db.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      ['premium', userId]
    );

    return res.status(200).json({ message: 'User upgraded to premium' });

  } catch (error) {
    console.error('Upgrade error:', error);
    return res.status(500).json({ message: 'Server error during upgrade' });
  }
};

// --- TASK 4: Update user profile info ---
/**
 * updateProfile: Updates basic profile fields for a user.
 * 1. Validate required profile fields
 * 2. Run an UPDATE query on the users table
 */
const updateProfile = async (req, res) => {
  // id comes from the route parameter (/:id)
  const { id } = req.params;
  const { username, height_cm, weight_kg, age, gender, goal } = req.body;

  // Step 1: Ensure all profile fields are present
  if (!username || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Missing profile fields' });
  }

  try {
    // Step 2: Update user row with new values
    await db.execute(
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
};

// Export controller methods for use in route definitions
module.exports = {
  registerUser,
  loginUser,
  upgradeToPremium,
  updateProfile
};
