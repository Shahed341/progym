const mysql = require('mysql2');

let db;

function connectDB() {
    db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'shahed',
        database: process.env.DB_NAME || 'progymdb'
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            console.log('Retrying database connection in 5 seconds...');
            setTimeout(connectDB, 5000); // Retry after 5 seconds
        } else {
            console.log('✅ Connected to MySQL Database');
        }
    });
}

connectDB();

module.exports = db;
