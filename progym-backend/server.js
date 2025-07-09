// Step 1: Import required modules
const express = require('express');                  // Express framework
const cors = require('cors');                        // CORS middleware
require('dotenv').config();                          // Load environment variables

const app = express();                               // Create Express instance

// Step 2: Global Middlewares
app.use(cors());                                     // Allow frontend to access backend
app.use(express.json());                             // Parse incoming JSON
app.use(express.urlencoded({ extended: true }));     // Parse URL-encoded data

// Step 3: Import Routes
const authRoutes = require('./routes/auth');
const gymbotRoutes = require('./routes/gymbot');
const workoutRoutes = require('./routes/workoutRoutes');
const mealPlannerRoutes = require('./routes/mealPlanner'); // ✅ New: Meal Planner API

// Step 4: Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/gymbot', gymbotRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/mealplan', mealPlannerRoutes);         // ✅ New: Expose /api/mealplan route

// Step 5: Basic Health Check
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running ✅');
});

// Step 6: Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
