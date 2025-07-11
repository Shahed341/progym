-- ===========================
-- CREATE DATABASE
-- ===========================
CREATE DATABASE IF NOT EXISTS progymdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE progymdb;

-- ===========================
-- USERS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'premium') NOT NULL DEFAULT 'user',
    height_cm INT,
    weight_kg INT,
    age INT,
    gender ENUM('male', 'female', 'other'),
    goal ENUM('cutting', 'bulking', 'maintenance'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================
-- WORKOUTS TABLE
-- Matches backend query for workout progress
-- ===========================
CREATE TABLE IF NOT EXISTS workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    exercise VARCHAR(100) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight DECIMAL(5,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- MEALS TABLE
-- Required for calorie and macro tracking
-- ===========================
CREATE TABLE IF NOT EXISTS meals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    calories INT,
    protein INT,
    carbs INT,
    fat INT,
    meal_type ENUM('breakfast', 'lunch', 'dinner') DEFAULT 'lunch',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- WATER INTAKE TABLE
-- Required for hydration progress
-- ===========================
CREATE TABLE IF NOT EXISTS water_intake (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    total_ml INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- FOODS TABLE
-- Master food data used in meal plans
-- ===========================
CREATE TABLE IF NOT EXISTS foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    calories FLOAT NOT NULL,
    protein_per_100g FLOAT NOT NULL,
    carbs_per_100g FLOAT NOT NULL,
    fat_per_100g FLOAT NOT NULL
);

-- ===========================
-- MEAL PLANS TABLE
-- Metadata about generated plans
-- ===========================
CREATE TABLE IF NOT EXISTS meal_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meals_per_day INT NOT NULL,
    total_calories INT,
    total_protein FLOAT,
    total_carbs FLOAT,
    total_fat FLOAT,
    goal ENUM('cutting', 'bulking', 'maintenance'),
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- MEAL PLAN ITEMS TABLE
-- Food assignments within a plan
-- ===========================
CREATE TABLE IF NOT EXISTS meal_plan_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meal_plan_id INT NOT NULL,
    meal_number INT NOT NULL,
    food_id INT NOT NULL,
    quantity_grams INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

-- ===========================
-- GYMBOT SESSIONS TABLE
-- Stores chatbot conversation sessions
-- ===========================
CREATE TABLE IF NOT EXISTS gymbot_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) DEFAULT 'Untitled Chat',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ===========================
-- GYMBOT MESSAGES TABLE
-- Stores messages exchanged with the chatbot
-- ===========================
CREATE TABLE IF NOT EXISTS gymbot_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    sender ENUM('user', 'bot') NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES gymbot_sessions(id) ON DELETE CASCADE
);
