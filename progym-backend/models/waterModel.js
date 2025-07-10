const db = require('../config/db');

exports.getWaterIntake = async (userId, sinceDate) => {
  const [rows] = await db.query(`
    SELECT date, SUM(amount_ml) AS total_ml
    FROM water_intake
    WHERE user_id = ? AND date >= ?
    GROUP BY date
    ORDER BY date ASC
  `, [userId, sinceDate]);
  return rows;
};
