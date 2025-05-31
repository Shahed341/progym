// File: progym-backend/db.js

// Step 1: Import mysql2 with Promise support to use modern async/await syntax
const mysql = require('mysql2/promise');

let pool; // Step 2: Declare a variable to hold the connection pool

/**
 * Step 3: Connects to the MySQL database using a connection pool.
 * The pool manages multiple connections for better performance.
 */
async function connectDB() {
  try {
    // Step 4: Create a connection pool with the provided credentials or .env fallbacks
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'shahed',
      database: process.env.DB_NAME || 'progymdb',
      waitForConnections: true, // wait instead of throwing an error if no connection is available
      connectionLimit: 10,      // maximum number of concurrent connections
      queueLimit: 0             // unlimited queue size
    });

    // Step 5: Get one connection from the pool to test if the DB is reachable
    const conn = await pool.getConnection();
    console.log('Connected to MySQL Database');

    // Step 6: Release the connection back to the pool
    conn.release();
  } catch (err) {
    // Step 7: If connection fails, print error and retry after 5 seconds
    console.error('Failed to connect to MySQL:', err.message);
    setTimeout(connectDB, 5000); // Retry connection after delay
  }
}

// Step 8: Immediately call connectDB to establish the pool when server starts
connectDB();

/**
 * Step 9: Export two utility functions:
 * - `execute`: used for INSERT, UPDATE, DELETE with parameters
 * - `query`: used for SELECT statements
 */
module.exports = {
  execute: (...args) => pool.execute(...args),
  query: (...args) => pool.query(...args),
};
