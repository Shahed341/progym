const db = require('../config/db');

exports.getWorkoutsByUser = async (userId, sinceDate) => {
  const [rows] = await db.query(`
    SELECT date, SUM(weight) AS weight, SUM(sets) AS sets, SUM(reps) AS reps
    FROM workouts
    WHERE user_id = ? AND date >= ?
    GROUP BY date
    ORDER BY date ASC
  `, [userId, sinceDate]);
  return rows;
};
