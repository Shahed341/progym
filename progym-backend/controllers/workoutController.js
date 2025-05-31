// File: progym-backend/controllers/workoutController.js

const db = require('../config/db'); // MySQL DB connection pool


// --- TASK 1: Add a workout entry ---
exports.addWorkout = async (req, res) => {
  // Expected input from the frontend:
  // Example:
  // {
  //   category: "Chest",
  //   exercise: "Bench Press",
  //   sets: 4,
  //   reps: 10,
  //   weight: 60,
  //   date: "2025-05-21"
  // }
  const { category, exercise, sets, reps, weight, date } = req.body;

  // Step 1: Get user ID from session, fallback to ID 1 for dev/testing
  /*
    req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
    };
  */
  const user_id = req.session?.user?.id || 1;

  // optional debugging logs
  console.log('[Workout/Add] Request body:', req.body);
  console.log('[Workout/Add] Using user_id:', user_id);

  try {
    // Step 2: Prepare SQL query to insert workout
    const sql = `
      INSERT INTO workouts (user_id, category, exercise, sets, reps, weight, date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Step 3: Execute query with values
    await db.execute(sql, [user_id, category, exercise, sets, reps, weight, date]);

    // Step 4: Send success response
    res.status(201).json({ message: 'Workout added successfully' });
  } catch (err) {
    // Step 5: Handle DB error
    console.error('[Workout/Add] Error:', err.message);
    res.status(500).json({ error: 'Failed to add workout' });
  }
};


// --- TASK 2: Get all workouts for the logged-in user ---
exports.getWorkouts = async (req, res) => {
  // Step 1: Get user ID from session or fallback
  const user_id = req.session?.user?.id || 1;
  console.log('[Workout/Get] Fetching for user_id:', user_id);

  try {
    // Step 2: Query the DB for workouts sorted by date (latest first)
    const [rows] = await db.execute(
      'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC',
      [user_id]
    );

    // Step 3: Log and return the results
    console.log(`[Workout/Get] Found ${rows.length} records`);
    res.json(rows);
  } catch (err) {
    // Step 4: Handle DB error
    console.error('[Workout/Get] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};


// --- TASK 3: Delete a workout entry by its ID ---
exports.deleteWorkout = async (req, res) => {
  const user_id = req.session?.user?.id || 1; // Step 1: Get current user ID
  const workoutId = req.params.id;            // Step 2: Get workout ID from URL params

  console.log(`[Workout/Delete] Trying to delete ID ${workoutId} for user ${user_id}`);

  try {
    // Step 3: Execute DELETE query with ID and user ID for safety
    const [result] = await db.execute(
      'DELETE FROM workouts WHERE id = ? AND user_id = ?',
      [workoutId, user_id]
    );

    // Step 4: Check if any row was actually deleted
    if (result.affectedRows === 0) {
      console.warn('[Workout/Delete] No match to delete');
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Step 5: Respond with success
    console.log('[Workout/Delete] Deleted successfully');
    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    // Step 6: Handle error
    console.error('[Workout/Delete] Error:', err.message);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};
