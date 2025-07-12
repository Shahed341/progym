import React, { useState } from 'react';
import axios from 'axios';

export default function CalorieTracker() {
  const [form, setForm] = useState({
    protein: '',
    carbs: '',
    fat: '',
    waterMl: ''
  });
  const [status, setStatus] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const today = new Date().toISOString().split('T')[0];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const protein = Number(form.protein) || 0;
    const carbs   = Number(form.carbs)   || 0;
    const fat     = Number(form.fat)     || 0;
    const waterMl = Number(form.waterMl) || 0;

    // Compute total calories
    const totalCalories = protein * 4 + carbs * 4 + fat * 9;

    // Build the payload your /api/mealplan/save expects:
    const payload = {
      userId: user.id,
      mealsPerDay: 1,        // this is just today's summary
      date: today,
      goal: user.goal || 'maintenance',
      waterMl,
      totalCalories,
      totalProtein: protein,
      totalCarbs: carbs,
      totalFat: fat,
      meals: []              // no granular items for a daily summary
    };

    try {
      // Single call to save both macros & water
      await axios.post('http://localhost:5000/api/mealplan/save', payload);

      setStatus('✅ Daily macros & water logged!');
      setForm({ protein: '', carbs: '', fat: '', waterMl: '' });
    } catch (err) {
      console.error('❌ Error saving daily data:', err);
      setStatus('❌ Failed to save. See console.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
      <h2>🍽️ Daily Macro & Water Tracker</h2>

      <label>Protein (g):</label>
      <input
        type="number" name="protein"
        value={form.protein} onChange={handleChange}
        placeholder="e.g. 120"
      />

      <label>Carbs (g):</label>
      <input
        type="number" name="carbs"
        value={form.carbs} onChange={handleChange}
        placeholder="e.g. 200"
      />

      <label>Fat (g):</label>
      <input
        type="number" name="fat"
        value={form.fat} onChange={handleChange}
        placeholder="e.g. 70"
      />

      <label>Water (ml):</label>
      <input
        type="number" name="waterMl"
        value={form.waterMl} onChange={handleChange}
        placeholder="e.g. 2500"
      />

      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        Log Today’s Macros & Water
      </button>

      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}