// src/services/mealPlannerService.js

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Fetch personalized meal plan from the backend
 * @param {number} userId - ID of the logged-in user
 * @param {number} mealsPerDay - Number of meals user wants per day
 */
export async function getMealPlan(userId, mealsPerDay) {
  const res = await axios.get(`${API_BASE}/api/mealplan`, {
    params: { userId, mealsPerDay }
  });
  return res.data;
}

/**
 * Save the meal plan and water intake to the backend
 * @param {Object} payload - Meal and hydration data
 * @param {number} payload.userId
 * @param {string} payload.date - in YYYY-MM-DD format
 * @param {number} payload.mealsPerDay
 * @param {number} payload.waterMl
 * @param {string} payload.goal
 * @param {Array} payload.meals - [{ meal: 1, items: [{ name, grams }] }]
 * @param {number} payload.totalCalories
 */
export async function saveMealPlan(payload) {
  const res = await axios.post(`${API_BASE}/api/mealplan/save`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
}
