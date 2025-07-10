const db = require('../config/db');

exports.getDailyMealMacros = async (userId, sinceDate) => {
  const [rows] = await db.query(`
    SELECT mp.date,
      SUM(f.calories) AS calories,
      SUM(f.protein_per_100g) AS protein,
      SUM(f.carbs_per_100g) AS carbs,
      SUM(f.fat_per_100g) AS fat
    FROM meal_plans mp
    JOIN meal_plan_items mpi ON mp.id = mpi.meal_plan_id
    JOIN foods f ON mpi.food_id = f.id
    WHERE mp.user_id = ? AND mp.date >= ?
    GROUP BY mp.date
    ORDER BY mp.date ASC
  `, [userId, sinceDate]);
  return rows;
};
