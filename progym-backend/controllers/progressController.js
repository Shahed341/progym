const workoutModel = require('../models/workoutModel');
const waterModel = require('../models/waterModel');
const db = require('../config/db');

// Utility to get ISO date strings for today and 7 days ago
const getDateRange = () => {
  const today = new Date();
  const past7 = new Date();
  past7.setDate(today.getDate() - 6);
  return {
    today: today.toISOString().split('T')[0],
    past7: past7.toISOString().split('T')[0]
  };
};

// Fetch basic profile info
const getUserProfile = async (userId) => {
  const [rows] = await db.query(
    `SELECT height_cm, weight_kg, age, gender, goal
     FROM users
     WHERE id = ?`,
    [userId]
  );
  return rows[0] || null;
};

exports.getProgressSummary = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const { today, past7 } = getDateRange();

    // Parallel fetch of workouts and water
    const [profile, workouts7d, water7d, workoutsAll, waterAll] = await Promise.all([
      getUserProfile(userId),
      workoutModel.getWorkoutsByUser(userId, past7),
      waterModel.getWaterIntake(userId, past7),
      workoutModel.getWorkoutsByUser(userId, '2000-01-01'),
      waterModel.getWaterIntake(userId, '2000-01-01')
    ]);

    // Fetch daily and all-time macros & calories from meal_plans
    const [plan7dRows] = await db.query(
      `SELECT date,
              total_calories AS calories,
              total_protein  AS protein,
              total_carbs    AS carbs,
              total_fat      AS fat
       FROM meal_plans
       WHERE user_id = ? AND date >= ?
       ORDER BY date ASC`,
      [userId, past7]
    );

    const [planAllRows] = await db.query(
      `SELECT date,
              total_calories AS calories,
              total_protein  AS protein,
              total_carbs    AS carbs,
              total_fat      AS fat
       FROM meal_plans
       WHERE user_id = ? AND date >= '2000-01-01'
       ORDER BY date ASC`,
      [userId]
    );

    // Static goals (could derive from profile)
    const calorieGoal = 2000;
    const waterGoalMl = 3000;

    // Today's summary from meal_plans
    const todayPlan = plan7dRows.find(r => r.date.toISOString().split('T')[0] === today) || {};
    const todayCalories = Number(todayPlan.calories) || 0;
    const todayProtein  = Number(todayPlan.protein)  || 0;
    const todayCarbs    = Number(todayPlan.carbs)    || 0;
    const todayFat      = Number(todayPlan.fat)      || 0;

    // Today's water
    const waterToday = Number(
      water7d.find(w => w.date.toISOString().split('T')[0] === today)?.total_ml
      || 0
    );

    // Weekly trends
    const last7daysCalories = plan7dRows.map(r => ({ date: r.date, calories: Number(r.calories) || 0 }));
    const macrosSum = plan7dRows.reduce(
      (acc, m) => ({
        protein: acc.protein + (Number(m.protein) || 0),
        carbs:   acc.carbs   + (Number(m.carbs)   || 0),
        fat:     acc.fat     + (Number(m.fat)     || 0)
      }), { protein: 0, carbs: 0, fat: 0 }
    );

    const avgMacros = {
      protein: Math.round(macrosSum.protein / (plan7dRows.length || 1)),
      carbs:   Math.round(macrosSum.carbs   / (plan7dRows.length || 1)),
      fat:     Math.round(macrosSum.fat     / (plan7dRows.length || 1))
    };

    // Assemble response
    const progressSummary = {
      calories: {
        today: todayCalories,
        goal: calorieGoal,
        filledPercent: Math.min(100, Math.round((todayCalories / calorieGoal) * 100)),
        last7days: last7daysCalories
      },
      water: {
        todayMl: waterToday,
        goalMl: waterGoalMl
      },
      macros: {
        today: { protein: todayProtein, carbs: todayCarbs, fat: todayFat },
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
