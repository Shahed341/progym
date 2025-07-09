const db = require('../config/db');

/**
 * Fetch all food items from the database
 */
async function getAllFoods() {
  const [rows] = await db.execute('SELECT * FROM foods');
  return rows;
}

/**
 * Find a specific food by name (exact match)
 */
async function findFoodByName(name) {
  const [rows] = await db.execute('SELECT * FROM foods WHERE name = ?', [name]);
  return rows[0];
}

/**
 * (Optional) Get top foods by macro type (e.g., protein-rich foods)
 */
async function getFoodsByMacro(macro = 'protein', threshold = 10) {
  const column = `${macro}_per_100g`;
  const query = `SELECT * FROM foods WHERE ${column} >= ? ORDER BY ${column} DESC LIMIT 20`;
  const [rows] = await db.execute(query, [threshold]);
  return rows;
}

module.exports = {
  getAllFoods,
  findFoodByName,
  getFoodsByMacro,
};
