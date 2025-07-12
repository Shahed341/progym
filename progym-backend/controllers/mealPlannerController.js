const db = require('../config/db');
const generateMealPlan = require('../services/generateMealPlan');

// GET /api/mealplan?userId=<id>&mealsPerDay=<n>
exports.getMealPlan = async (req, res) => {
  const { userId, mealsPerDay } = req.query;
  try {
    const [[user]] = await db.query(
      'SELECT id, height_cm, weight_kg, age, gender, goal FROM users WHERE id = ?',
      [userId]
    );
    const [foods] = await db.query('SELECT * FROM foods');

    if (!user || foods.length === 0) {
      return res.status(400).json({ message: 'User or food data not found' });
    }

    const plan = generateMealPlan(user, parseInt(mealsPerDay, 10), foods);
    return res.json(plan);
  } catch (err) {
    console.error('❌ Meal Plan Error:', err);
    return res.status(500).json({ message: 'Failed to generate meal plan' });
  }
};

// POST /api/mealplan/save
exports.saveMealPlan = async (req, res) => {
  const {
    userId,
    mealsPerDay,
    date,
    goal,
    waterMl,
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    meals
  } = req.body;

  try {
    // Insert daily summary
    const [planResult] = await db.query(
      `INSERT INTO meal_plans
         (user_id, meals_per_day, total_calories, total_protein, total_carbs, total_fat, goal, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        parseInt(mealsPerDay, 10),
        totalCalories || 0,
        totalProtein  || 0,
        totalCarbs    || 0,
        totalFat      || 0,
        goal,
        date
      ]
    );
    const mealPlanId = planResult.insertId;

    // Clear existing items for this plan
    await db.query(
      'DELETE FROM meal_plan_items WHERE meal_plan_id = ?',
      [mealPlanId]
    );

    // Insert new meal items
    for (const meal of meals) {
      const mealNumber = parseInt(meal.meal, 10);
      for (const item of meal.items) {
        const qty = Number(item.grams) || 0;
        if (qty <= 0) continue;
        const [[food]] = await db.query(
          'SELECT id FROM foods WHERE name = ? LIMIT 1',
          [item.name]
        );
        if (!food) continue;
        await db.query(
          `INSERT INTO meal_plan_items
             (meal_plan_id, meal_number, food_id, quantity_grams)
           VALUES (?, ?, ?, ?)`,
          [mealPlanId, mealNumber, food.id, qty]
        );
      }
    }

    // Insert/update water intake
    await db.query(
      `INSERT INTO water_intake (user_id, date, total_ml)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE total_ml = VALUES(total_ml)`,
      [userId, date, Number(waterMl) || 0]
    );

    return res.status(200).json({ message: 'Meal plan and water intake saved successfully' });
  } catch (err) {
    console.error('❌ Save Meal Plan Error:', err);
    return res.status(500).json({ message: 'Failed to save meal plan' });
  }
};

// POST /api/mealplan/water
exports.addWater = async (req, res) => {
  const { user_id, date, total_ml } = req.body;
  if (!user_id || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    await db.query(
      `INSERT INTO water_intake (user_id, date, total_ml)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE total_ml = VALUES(total_ml)`,
      [user_id, date, total_ml]
    );
    return res.status(201).json({ message: 'Water intake logged' });
  } catch (err) {
    console.error('❌ Water intake error:', err);
    return res.status(500).json({ message: 'Failed to log water intake' });
  }
};
