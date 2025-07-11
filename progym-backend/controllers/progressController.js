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

// Get user profile info
const getUserProfile = async (userId) => {
  const [rows] = await db.query(`
    SELECT height_cm, weight_kg, age, gender, goal
    FROM users
    WHERE id = ?
  `, [userId]);
  return rows.length ? rows[0] : null;
};

// Helper to sum macros
const sumMacros = (meals) => {
  return meals.reduce((acc, m) => {
    acc.protein += m.protein || 0;
    acc.carbs += m.carbs || 0;
    acc.fat += m.fat || 0;
    return acc;
  }, { protein: 0, carbs: 0, fat: 0 });
};

exports.getProgressSummary = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const { today, past7 } = getDateRange();

    // Fetch all data in parallel
    const [profile, workouts7d, meals7d, water7d, workoutsAll, mealsAll, waterAll] = await Promise.all([
      getUserProfile(userId),
      workoutModel.getWorkoutsByUser(userId, past7),
      mealModel.getDailyMealMacros(userId, past7),
      waterModel.getWaterIntake(userId, past7),
      workoutModel.getWorkoutsByUser(userId, '2000-01-01'),
      mealModel.getDailyMealMacros(userId, '2000-01-01'),
      waterModel.getWaterIntake(userId, '2000-01-01'),
    ]);

    // Use static calorie goal or derive from profile (future improvement)
    const calorieGoal = 2000;
    const waterGoalMl = 3000;

    // Today’s calories/macros
    const todayMeal = meals7d.find(m => m.date === today) || { calories: 0, protein: 0, carbs: 0, fat: 0 };
    const waterToday = water7d.find(w => w.date === today)?.total_ml || 0;

    // Last 7 days calorie trend
    const last7daysCalories = meals7d.map(m => ({
      date: m.date,
      calories: m.calories || 0
    }));

    // Average macros over last 7 days
    const macrosSum = sumMacros(meals7d);
    const avgMacros = {
      protein: Math.round(macrosSum.protein / (meals7d.length || 1)),
      carbs: Math.round(macrosSum.carbs / (meals7d.length || 1)),
      fat: Math.round(macrosSum.fat / (meals7d.length || 1)),
    };

    // Build response object
    const progressSummary = {
      calories: {
        today: todayMeal.calories || 0,
        goal: calorieGoal,
        filledPercent: Math.min(100, Math.round((todayMeal.calories / calorieGoal) * 100)),
        last7days: last7daysCalories
      },
      water: {
        todayMl: waterToday,
        goalMl: waterGoalMl
      },
      macros: {
        today: {
          protein: todayMeal.protein || 0,
          carbs: todayMeal.carbs || 0,
          fat: todayMeal.fat || 0
        },
        last7daysAvg: avgMacros
      },
      workouts: {
        last7days: workouts7d || [],
        allTime: workoutsAll || []
      }
    };

    return res.status(200).json(progressSummary);

  } catch (err) {
    console.error('❌ Progress Summary Error:', err);
    return res.status(500).json({ message: 'Server error while loading progress summary' });
  }
};
