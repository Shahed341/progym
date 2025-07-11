const db = require('../config/db');

exports.getDailyMealMacros = async (userId, sinceDate) => {
  const [rows] = await db.query(`
    SELECT date,
      SUM(calories) AS calories,
      SUM(protein) AS protein,
      SUM(carbs) AS carbs,
      SUM(fat) AS fat
    FROM meals
    WHERE user_id = ? AND date >= ?
    GROUP BY date
    ORDER BY date ASC
  `, [userId, sinceDate]);
  return rows;
};
