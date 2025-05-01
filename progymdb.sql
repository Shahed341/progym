-- Create Database if it doesn't exist
CREATE DATABASE IF NOT EXISTS progymdb;

-- Use the database
USE progymdb;

-- Create Users table with role support
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user', -- Role: user, premium, admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create WorkoutSessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    workout_type VARCHAR(255),
    reps INT,
    weight INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
