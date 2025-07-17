// File: server.js
// Path: ./progym-backend/server.js

// Step 1: Import required modules
const express = require('express');                  // Express framework for building HTTP server
const cors = require('cors');                        // Middleware to enable Cross-Origin Resource Sharing
require('dotenv').config();                          // Load environment variables from .env file

// Create an instance of an Express application
const app = express();                               // Entry point for configuring routes and middleware

// Step 2: Global Middlewares
app.use(cors());                                     // Enable CORS so frontend apps can make requests
app.use(express.json());                             // Automatically parse JSON payloads in request bodies
app.use(express.urlencoded({ extended: true }));     // Parse URL-encoded form data

// Step 3: Import Routes
// Each route module handles a specific set of endpoints
const authRoutes = require('./routes/auth');
const gymbotRoutes = require('./routes/gymbot');
const workoutRoutes = require('./routes/workoutRoutes');
const mealPlannerRoutes = require('./routes/mealPlanner');
const progressRoutes = require('./routes/progressRoutes');  // Progress summary endpoints

// Step 4: Register Routes
// Prefix each router with a base path
app.use('/api/auth', authRoutes);                   // Authentication and user management
app.use('/api/gymbot', gymbotRoutes);               // Chatbot interaction endpoints
app.use('/api/workouts', workoutRoutes);            // Workout CRUD operations
app.use('/api/mealplan', mealPlannerRoutes);        // Meal planning endpoints
app.use('/api/progress', progressRoutes);           // Progress summary and analytics

// Step 5: Basic Health Check
// Provides a simple endpoint to verify the server is running
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running');               // Respond with a plain message
});

// Step 6: Start Server
// Listen on the configured port, defaulting to 5000
const PORT = process.env.PORT || 5000;               // Use environment variable or fallback
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
