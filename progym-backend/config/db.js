// config/db.js
const mysql = require('mysql2');

// Connection config
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'yourpassword',
    database: process.env.DB_NAME || 'progymdb'
};

// Connect to database with retry logic
const connectWithRetry = () => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            console.log('Retrying in 5 seconds...');
            setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
        } else {
            console.log('✅ Connected to MySQL Database');
        }
    });

    // Export the connection
    module.exports = connection;
};

connectWithRetry();
