const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ====== MIDDLEWARES ======
app.use(cors());
app.use(express.json());

// ====== IMPORT ROUTES ======
const authRoutes = require('./routes/auth');
const gymbotRoutes = require('./routes/gymbot');
const workoutRoutes = require('./routes/workoutRoutes'); // ✅ ADD THIS

// ====== USE ROUTES ======
app.use('/api/auth', authRoutes);
app.use('/api/gymbot', gymbotRoutes);
app.use('/api/workouts', workoutRoutes); // ✅ AND THIS

// ====== BASIC TEST ROUTE ======
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running');
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
