const workoutModel = require('../models/workoutModel');
const mealModel = require('../models/mealModel');
const waterModel = require('../models/waterModel');
const db = require('../config/db');

// Utility to get today and the last 7 days
const getDateRange = () => {
  const today = new Date();
  const past7 = new Date();
  past7.setDate(today.getDate() - 6);
  return {
    today: today.toISOString().split('T')[0],
    past7: past7.toISOString().split('T')[0]
  };
};

// Utility to get user goal info
const getUserProfile = async (userId) => {
  const [rows] = await db.query(`
    SELECT height_cm, weight_kg, age, gender, goal
    FROM users
    WHERE id = ?
  `, [userId]);
  return rows.length ? rows[0] : null;
};

// ================================
// MAIN CONTROLLER
// ================================
exports.getProgressSummary = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const { today, past7 } = getDateRange();

    // Fetch data from models
    const [profile, workouts7d, meals7d, water7d, workoutsAll, mealsAll, waterAll] = await Promise.all([
      getUserProfile(userId),

      workoutModel.getWorkoutsByUser(userId, past7),
      mealModel.getDailyMealMacros(userId, past7),
      waterModel.getWaterIntake(userId, past7),

      workoutModel.getWorkoutsByUser(userId, '2000-01-01'),
      mealModel.getDailyMealMacros(userId, '2000-01-01'),
      waterModel.getWaterIntake(userId, '2000-01-01'),
    ]);

    return res.status(200).json({
      profile,           // User's body data & goal
      past7: {
        workouts: workouts7d,
        meals: meals7d,
        water: water7d
      },
      allTime: {
        workouts: workoutsAll,
        meals: mealsAll,
        water: waterAll
      }
    });

  } catch (err) {
    console.error('❌ Progress Summary Error:', err);
    return res.status(500).json({ message: 'Server error while loading progress summary' });
  }
};
