const db = require('../config/db');

/**
 * Insert a new meal plan summary into meal_plans
 * Returns the inserted meal_plan ID
 */
async function insertMealPlan(userId, goal, mealsPerDay, totals) {
  const { calories, protein, carbs, fat } = totals;
  const [result] = await db.execute(
    `INSERT INTO meal_plans 
     (user_id, goal, meals_per_day, total_calories, total_protein, total_carbs, total_fat)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, goal, mealsPerDay, calories, protein, carbs, fat]
  );
  return result.insertId;
}

/**
 * Insert meal plan items (one or more rows)
 * Each item: { meal_number, food_id, quantity_grams }
 */
async function insertMealItems(mealPlanId, items) {
  const insertPromises = items.map(item =>
    db.execute(
      `INSERT INTO meal_plan_items 
       (meal_plan_id, meal_number, food_id, quantity_grams) 
       VALUES (?, ?, ?, ?)`,
      [mealPlanId, item.meal_number, item.food_id, item.quantity_grams]
    )
  );
  await Promise.all(insertPromises);
}

/**
 * Get all saved meal plans for a user
 */
async function getMealPlansByUser(userId) {
  const [rows] = await db.execute(
    'SELECT * FROM meal_plans WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

/**
 * Get full meal plan with items
 */
async function getMealPlanWithItems(planId) {
  const [planRows] = await db.execute(
    'SELECT * FROM meal_plans WHERE id = ?',
    [planId]
  );
  const [items] = await db.execute(
    `SELECT i.*, f.name, f.calories, f.protein_per_100g, f.carbs_per_100g, f.fat_per_100g 
     FROM meal_plan_items i 
     JOIN foods f ON i.food_id = f.id 
     WHERE i.meal_plan_id = ?
     ORDER BY i.meal_number`,
    [planId]
  );
  return {
    plan: planRows[0],
    meals: items
  };
}

module.exports = {
  insertMealPlan,
  insertMealItems,
  getMealPlansByUser,
  getMealPlanWithItems,
};
