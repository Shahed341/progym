const db = require('../config/db');
const generateMealPlan = require('../services/generateMealPlan');

exports.getPersonalizedMealPlan = async (req, res) => {
  try {
    const { userId, mealsPerDay } = req.query;

    if (!userId || !mealsPerDay) {
      return res.status(400).json({ error: 'Missing userId or mealsPerDay in query' });
    }

    // 1. Get user profile info
    const [rows] = await db.execute(
      'SELECT weight_kg, height_cm, age, gender, goal FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // 2. Get all available foods
    const [foods] = await db.execute('SELECT * FROM foods');

    if (foods.length === 0) {
      return res.status(500).json({ error: 'No food data available' });
    }

    // 3. Generate plan using service logic
    const mealPlan = generateMealPlan(user, parseInt(mealsPerDay), foods);

    // 4. Return the generated plan (or optionally save it)
    return res.status(200).json(mealPlan);

  } catch (err) {
    console.error('Meal plan error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
