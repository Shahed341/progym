const db = require('../config/db');
const generateMealPlan = require('../services/generateMealPlan'); // No destructuring if using module.exports = function

// GET /api/mealplan?userId=3&mealsPerDay=3
exports.getMealPlan = async (req, res) => {
  const { userId, mealsPerDay } = req.query;

  try {
    // Fetch user profile and food list
    const [[user]] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const [foods] = await db.query('SELECT * FROM foods');

    if (!user || !foods.length) {
      return res.status(400).json({ message: 'User or food data not found' });
    }

    // Generate meal plan logic
    const plan = generateMealPlan(user, parseInt(mealsPerDay), foods);
    res.json(plan);
  } catch (err) {
    console.error('❌ Meal Plan Error:', err);
    res.status(500).json({ message: 'Failed to generate meal plan' });
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
    meals // [{ meal: 1, items: [{ name, grams }] }]
  } = req.body;

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    // 1. Insert meal plan summary
    const [planResult] = await conn.query(
      `INSERT INTO meal_plans 
       (user_id, meals_per_day, total_calories, total_protein, total_carbs, total_fat, goal, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, parseInt(mealsPerDay), totalCalories, totalProtein, totalCarbs, totalFat, goal, date]
    );

    const mealPlanId = planResult.insertId;

    // 2. Add meal items to meal_plan_items table
    for (const meal of meals) {
      for (const item of meal.items) {
        const [food] = await conn.query('SELECT id FROM foods WHERE name = ? LIMIT 1', [item.name]);
        if (!food.length) continue;

        await conn.query(
          `INSERT INTO meal_plan_items 
           (meal_plan_id, meal_number, food_id, quantity_grams)
           VALUES (?, ?, ?, ?)`,
          [mealPlanId, meal.meal, food[0].id, item.grams]
        );
      }
    }

    // 3. Save water intake for the same day
    await conn.query(
      `INSERT INTO water_intake (user_id, date, amount_ml)
       VALUES (?, ?, ?)`,
      [userId, date, parseInt(waterMl)]
    );

    await conn.commit();
    res.status(200).json({ message: 'Meal plan and water intake saved successfully' });

  } catch (err) {
    await conn.rollback();
    console.error('❌ Save Meal Plan Error:', err);
    res.status(500).json({ message: 'Failed to save meal plan' });
  } finally {
    conn.release();
  }
};
