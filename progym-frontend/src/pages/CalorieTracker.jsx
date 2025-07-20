// Path: progym-frontend/src/pages/CalorieTracker.jsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CalorieTrackerStyles'; // Premium visual styles for tracker form

export default function CalorieTracker() {
  // Track form input values for protein, carbs, fat, and water
  const [form, setForm] = useState({
    protein: '',
    carbs: '',
    fat: '',
    waterMl: ''
  });

  // Track status message to show success or failure
  const [status, setStatus] = useState('');

  // Retrieve current user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // Update state when form values change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit daily macro and water data to backend
  const handleSubmit = async () => {
    const protein = Number(form.protein) || 0;
    const carbs   = Number(form.carbs)   || 0;
    const fat     = Number(form.fat)     || 0;
    const waterMl = Number(form.waterMl) || 0;

    // Calculate total daily calories based on macros
    const totalCalories = protein * 4 + carbs * 4 + fat * 9;

    const payload = {
      userId: user.id,
      mealsPerDay: 1,
      date: today,
      goal: user.goal || 'maintenance',
      waterMl,
      totalCalories,
      totalProtein: protein,
      totalCarbs: carbs,
      totalFat: fat,
      meals: []
    };

    try {
      await axios.post('http://localhost:5000/api/mealplan/save', payload);
      setStatus('✅ Daily macros & water logged!');
      setForm({ protein: '', carbs: '', fat: '', waterMl: '' });
    } catch (err) {
      console.error('❌ Error saving daily data:', err);
      setStatus('❌ Failed to save. See console.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍽️ Daily Macro & Water Tracker</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Protein (g):</label>
          <input
            type="number"
            name="protein"
            value={form.protein}
            onChange={handleChange}
            placeholder="e.g. 120"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Carbs (g):</label>
          <input
            type="number"
            name="carbs"
            value={form.carbs}
            onChange={handleChange}
            placeholder="e.g. 200"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Fat (g):</label>
          <input
            type="number"
            name="fat"
            value={form.fat}
            onChange={handleChange}
            placeholder="e.g. 70"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Water (ml):</label>
          <input
            type="number"
            name="waterMl"
            value={form.waterMl}
            onChange={handleChange}
            placeholder="e.g. 2500"
            style={styles.input}
          />
        </div>

        <button onClick={handleSubmit} style={styles.button}>
          Log Today’s Macros & Water
        </button>

        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
}
