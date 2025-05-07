// File: progym-backend/controllers/workoutController.js

const db = require('../config/db'); // Promise-based pool from db.js

// Add a workout entry
exports.addWorkout = async (req, res) => {
  const { category, exercise, sets, reps, weight, date } = req.body;
  const user_id = req.session?.user?.id || 1; // Fallback to ID 1 for dev/testing

  console.log('[Workout/Add] Request body:', req.body);
  console.log('[Workout/Add] Using user_id:', user_id);

  try {
    const sql = `
      INSERT INTO workouts (user_id, category, exercise, sets, reps, weight, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.execute(sql, [user_id, category, exercise, sets, reps, weight, date]);

    res.status(201).json({ message: 'Workout added successfully' });
  } catch (err) {
    console.error('[Workout/Add] Error:', err.message);
    res.status(500).json({ error: 'Failed to add workout' });
  }
};

// Get workouts for the logged-in user
exports.getWorkouts = async (req, res) => {
  const user_id = req.session?.user?.id || 1;
  console.log('[Workout/Get] Fetching for user_id:', user_id);

  try {
    const [rows] = await db.execute(
      'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC',
      [user_id]
    );
    console.log(`[Workout/Get] Found ${rows.length} records`);
    res.json(rows);
  } catch (err) {
    console.error('[Workout/Get] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

// Delete a workout entry by ID
exports.deleteWorkout = async (req, res) => {
  const user_id = req.session?.user?.id || 1;
  const workoutId = req.params.id;

  console.log(`[Workout/Delete] Trying to delete ID ${workoutId} for user ${user_id}`);

  try {
    const [result] = await db.execute(
      'DELETE FROM workouts WHERE id = ? AND user_id = ?',
      [workoutId, user_id]
    );

    if (result.affectedRows === 0) {
      console.warn('[Workout/Delete] No match to delete');
      return res.status(404).json({ error: 'Workout not found' });
    }

    console.log('[Workout/Delete] Deleted successfully');
    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    console.error('[Workout/Delete] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};
