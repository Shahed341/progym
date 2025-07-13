// File: db.js
// Path: ./progym-backend/db.js

// Import the mysql2 library and enable Promise support for async/await operations
const mysql = require('mysql2/promise');

// Declare a variable to hold our connection pool instance
let pool;

/**
 * connectDB: Initializes a MySQL connection pool and tests connectivity.
 * - Uses environment variables for credentials, with sensible defaults.
 * - Retries on failure to ensure the server can eventually connect.
 */
async function connectDB() {
  try {
    // Create a pool of connections to improve performance and manage concurrent queries
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',   // Database host address
      user: process.env.DB_USER || 'root',        // Database username
      password: process.env.DB_PASS || 'shahed',  // Database password
      database: process.env.DB_NAME || 'progymdb',// Database name
      waitForConnections: true,                   // Queue connection requests rather than failing
      connectionLimit: 10,                        // Maximum simultaneous connections
      queueLimit: 0                               // No limit on queued requests
    });

    // Test the connection by obtaining one connection from the pool
    const conn = await pool.getConnection();
    console.log('Connected to MySQL Database');  // Success message

    // Release the test connection back into the pool for reuse
    conn.release();
  } catch (err) {
    // Log any errors encountered during connection setup
    console.error('Failed to connect to MySQL:', err.message);
    
    // Wait 5 seconds and then retry connection (useful if DB isn't ready yet)
    setTimeout(connectDB, 5000);
  }
}

// Immediately run the connectDB function when this module is loaded
connectDB();

/**
 * Export helper functions for database operations:
 * - execute: For INSERT, UPDATE, DELETE queries (returns [result, fields])
 * - query:   For SELECT queries (returns [rows, fields])
 */
module.exports = {
  execute: (...args) => pool.execute(...args),
  query: (...args) => pool.query(...args),
};
