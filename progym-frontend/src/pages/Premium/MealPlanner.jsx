// src/pages/Premium/meal-planner.jsx
import React, { useState } from 'react';
import styles from '../../styles/premium/MealPlannerStyles';

function MealPlanner() {
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [dietPreference, setDietPreference] = useState('veg');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Meal Plan:
    - Meals per day: ${mealsPerDay}
    - Calorie goal: ${calorieGoal} kcal
    - Preference: ${dietPreference === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Meal Planner</h1>
      <p style={styles.subtext}>
        Plan your meals based on your goals: weight loss, muscle gain, or maintenance.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Meals per day:
          <select
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(Number(e.target.value))}
            style={styles.input}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label style={styles.label}>
          Calorie Goal:
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(Number(e.target.value))}
            style={styles.input}
            min="1000"
            max="5000"
            step="50"
          />
        </label>

        <label style={styles.label}>
          Dietary Preference:
          <select
            value={dietPreference}
            onChange={(e) => setDietPreference(e.target.value)}
            style={styles.input}
          >
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
        </label>

        <button type="submit" style={styles.button}>Generate Plan</button>
      </form>
    </div>
  );
}

export default MealPlanner;
