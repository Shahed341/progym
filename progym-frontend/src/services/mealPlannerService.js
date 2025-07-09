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
