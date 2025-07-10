const bcrypt = require('bcryptjs');
const db = require('../config/db');

// --- TASK 1: Register a new user ---
const registerUser = async (req, res) => {
  const {
    username, email, password,
    height_cm, weight_kg, age, gender, goal
  } = req.body;

  if (!username || !email || !password || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

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
};

// --- TASK 2: Login an existing user ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const [userResult] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userResult.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

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
const upgradeToPremium = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  try {
    await db.execute('UPDATE users SET role = ? WHERE id = ?', ['premium', userId]);
    return res.status(200).json({ message: 'User upgraded to premium' });

  } catch (error) {
    console.error('Upgrade error:', error);
    return res.status(500).json({ message: 'Server error during upgrade' });
  }
};

// --- TASK 4: Update user profile info ---
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, height_cm, weight_kg, age, gender, goal } = req.body;

  if (!username || !height_cm || !weight_kg || !age || !gender || !goal) {
    return res.status(400).json({ message: 'Missing profile fields' });
  }

  try {
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

module.exports = {
  registerUser,
  loginUser,
  upgradeToPremium,
  updateProfile
};
