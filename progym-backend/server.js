// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Include database connection

const app = express();

// Enable CORS
app.use(cors());

// Simple route
app.get('/', (req, res) => {
  res.send('ProGYM Backend Running');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
