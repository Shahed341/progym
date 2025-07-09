import React, { useState, useContext } from 'react';
import styles from '../../styles/premium/MealPlannerStyles';
import { UserContext } from '../../context/UserContext';
import { getMealPlan } from '../../services/mealPlannerService';

function MealPlanner() {
  const { user } = useContext(UserContext);
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [dietPreference, setDietPreference] = useState('veg'); // reserved for future use
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMealPlan(null);

    try {
      const data = await getMealPlan(user.id, mealsPerDay);
      setMealPlan(data);
    } catch (err) {
      setError('⚠️ Failed to generate meal plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Smart Meal Planner</h1>
      <p style={styles.subtext}>
        Get a personalized meal plan based on your profile and goals.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Meals per day:
          <select
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(Number(e.target.value))}
            style={styles.input}
          >
            {[2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Dietary Preference:
          <select
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            style={styles.input}
            disabled
          >
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
          <small style={{ fontSize: '12px', color: '#999' }}>Coming soon</small>
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {mealPlan && (
        <div style={styles.results}>
          <h2 style={styles.resultsHeading}>
            Your Meal Plan ({mealPlan.calorieTarget} kcal)
          </h2>

          {mealPlan.suggestedMeals.map((meal) => (
            <div key={meal.meal} style={styles.mealCard}>
              <h3 style={styles.mealTitle}>Meal {meal.meal}</h3>
              <ul style={styles.mealList}>
                {meal.items.map((item, idx) => (
                  <li key={idx}>
                    {item.grams}g {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
