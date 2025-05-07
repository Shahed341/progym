// File: progym-backend/db.js

const mysql = require('mysql2/promise');

let pool;

async function connectDB() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'shahed',
      database: process.env.DB_NAME || 'progymdb',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the connection
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL Database');
    conn.release();
  } catch (err) {
    console.error('❌ Failed to connect to MySQL:', err.message);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
}

connectDB();

module.exports = {
  execute: (...args) => pool.execute(...args),
  query: (...args) => pool.query(...args),
};
