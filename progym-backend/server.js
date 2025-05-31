// Step:1 import required modules
const express = require('express'); // express framework for building APIs
const cors = require('cors'); // middleware to handle cross-origin requests
require('dotenv').config(); // load environment variables from .env file

const app = express(); // create an instance of express


// Step:2 Global Middlewares
app.use(cors()); // enables cross-origin resource sharing so frontend can access backend
app.use(express.json()); // middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded request bodies


// IMPORT ROUTES from routes directory
const authRoutes = require('./routes/auth'); 
const gymbotRoutes = require('./routes/gymbot');
const workoutRoutes = require('./routes/workoutRoutes');


// USE ROUTES / access them form frontend
app.use('/api/auth', authRoutes);
app.use('/api/gymbot', gymbotRoutes);
app.use('/api/workouts', workoutRoutes); // add, view, delete workouts using router


// BASIC TEST ROUTE
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running');
});


// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
