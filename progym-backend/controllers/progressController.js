const workoutModel = require('../models/workoutModel');
const mealModel = require('../models/mealModel');
const waterModel = require('../models/waterModel');
const db = require('../config/db');

// Get ISO date range strings for today and past 7 days
const getDateRange = () => {
  const today = new Date();
  const past7 = new Date();
  past7.setDate(today.getDate() - 6);
  return {
    today: today.toISOString().split('T')[0],  // 'YYYY-MM-DD'
    past7: past7.toISOString().split('T')[0]
  };
};

// Fetch basic profile info
const getUserProfile = async (userId) => {
  const [rows] = await db.query(`
    SELECT height_cm, weight_kg, age, gender, goal
    FROM users
    WHERE id = ?
  `, [userId]);
  return rows.length ? rows[0] : null;
};

// Sum total macros over an array of meal objects
const sumMacros = (meals) => {
  return meals.reduce((acc, m) => {
    acc.protein += Number(m.protein) || 0;
    acc.carbs += Number(m.carbs) || 0;
    acc.fat += Number(m.fat) || 0;
    return acc;
  }, { protein: 0, carbs: 0, fat: 0 });
};

exports.getProgressSummary = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  try {
    const { today, past7 } = getDateRange();
    // console.log("📆 Date range:", { today, past7 });

    // Parallel data fetch
    const [
      profile,
      workouts7d,
      meals7d,
      water7d,
      workoutsAll,
      mealsAll,
      waterAll
    ] = await Promise.all([
      getUserProfile(userId),
      workoutModel.getWorkoutsByUser(userId, past7),
      mealModel.getDailyMealMacros(userId, past7),
      waterModel.getWaterIntake(userId, past7),
      workoutModel.getWorkoutsByUser(userId, '2000-01-01'),
      mealModel.getDailyMealMacros(userId, '2000-01-01'),
      waterModel.getWaterIntake(userId, '2000-01-01')
    ]);

    // console.log("📦 meals7d:", meals7d);
    // console.log("📦 water7d:", water7d);

    const calorieGoal = 2000;
    const waterGoalMl = 3000;

    // Match today's meal by normalized date and cast values to numbers
    const todayMealRaw = meals7d.find(m => new Date(m.date).toISOString().split('T')[0] === today);
    const todayMeal = {
      calories: Number(todayMealRaw?.calories) || 0,
      protein: Number(todayMealRaw?.protein) || 0,
      carbs: Number(todayMealRaw?.carbs) || 0,
      fat: Number(todayMealRaw?.fat) || 0
    };

    // Match today's water intake
    const waterToday = Number(
      water7d.find(w => new Date(w.date).toISOString().split('T')[0] === today)?.total_ml || 0
    );

    // Format last 7 days calorie trend
    const last7daysCalories = meals7d.map(m => ({
      date: m.date,
      calories: Number(m.calories) || 0
    }));

    // Calculate average macros
    const macrosSum = sumMacros(meals7d);
    const avgMacros = {
      protein: Math.round(macrosSum.protein / (meals7d.length || 1)),
      carbs: Math.round(macrosSum.carbs / (meals7d.length || 1)),
      fat: Math.round(macrosSum.fat / (meals7d.length || 1)),
    };

    // Final result
    const progressSummary = {
      calories: {
        today: todayMeal.calories,
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
          protein: todayMeal.protein,
          carbs: todayMeal.carbs,
          fat: todayMeal.fat
        },
        last7daysAvg: avgMacros
      },
      workouts: {
        last7days: workouts7d || [],
        allTime: workoutsAll || []
      }
    };

    // console.log("✅ Final Progress Summary:", progressSummary);
    return res.status(200).json(progressSummary);

  } catch (err) {
    console.error('❌ Progress Summary Error:', err);
    return res.status(500).json({ message: 'Server error while loading progress summary' });
  }
};
