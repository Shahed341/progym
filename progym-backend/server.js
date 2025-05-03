const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ====== MIDDLEWARES ======
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse incoming JSON requests

// ====== IMPORT ROUTES ======
const authRoutes = require('./routes/auth');
const gymbotRoutes = require('./routes/gymbot'); // <-- New GymBot route

// ====== USE ROUTES ======
app.use('/api/auth', authRoutes);
app.use('/api/gymbot', gymbotRoutes); // <-- Mount GymBot route

// ====== BASIC TEST ROUTE ======
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running');
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
