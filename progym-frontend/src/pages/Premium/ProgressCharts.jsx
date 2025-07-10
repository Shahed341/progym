// src/pages/premium/ProgressCharts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/premium/ProgressChartsStyles';

import CalorieProgressBar from '../../components/charts/CalorieProgressBar';
import WaterJarProgress from '../../components/charts/WaterJarProgress';
import MacroPieChart from '../../components/charts/MacroPieChart';
import LineWorkoutTrend from '../../components/charts/LineWorkoutTrend';
import LineCalorieHistory from '../../components/charts/LineCalorieHistory';

function ProgressCharts() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) return;

    axios.get(`http://localhost:5000/api/progress/summary/${user.id}`)
      .then(res => setProgress(res.data))
      .catch(err => {
        console.error("❌ Failed to load progress summary:", err);
        // Set fallback defaults if fetch fails
        setProgress({
          calories: { today: 0, goal: 2000, filledPercent: 0 },
          water: { todayMl: 0, goalMl: 3000 },
          macros: { today: { protein: 0, carbs: 0, fat: 0 }, last7daysAvg: { protein: 0, carbs: 0, fat: 0 } },
          workouts: { last7days: [], allTime: [] },
        });
      });
  }, []);

  const calories = progress.calories || { today: 0, goal: 2000, filledPercent: 0 };
  const water = progress.water || { todayMl: 0, goalMl: 3000 };
  const macros = progress.macros || { today: { protein: 0, carbs: 0, fat: 0 }, last7daysAvg: { protein: 0, carbs: 0, fat: 0 } };
  const workouts = progress.workouts || { last7days: [], allTime: [] };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Progress Overview</h1>

      {/* 🟡 Section 1: Daily Goals */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔆 Today’s Goals</h2>
        <div style={styles.row}>
          <div style={styles.chartBox}>
            <h3>Calorie Intake</h3>
            <CalorieProgressBar percent={calories.filledPercent} consumed={calories.today} goal={calories.goal} />
          </div>

          <div style={styles.chartBox}>
            <h3>Water Intake</h3>
            <WaterJarProgress value={water.todayMl} goal={water.goalMl} />
          </div>

          <div style={styles.chartBox}>
            <h3>Macros</h3>
            <MacroPieChart macros={macros.today} />
          </div>
        </div>
      </section>

      {/* 🔵 Section 2: Last 7 Days */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📅 Last 7 Days</h2>
        <div style={styles.row}>
          <div style={styles.chartBoxWide}>
            <h3>Workout Trend</h3>
            <LineWorkoutTrend data={workouts.last7days} />
          </div>

          <div style={styles.chartBox}>
            <h3>Calorie Intake</h3>
            <LineCalorieHistory data={progress.calories?.last7days || []} />
          </div>

          <div style={styles.chartBox}>
            <h3>Avg Macros</h3>
            <MacroPieChart macros={macros.last7daysAvg} />
          </div>
        </div>
      </section>

      {/* 🟣 Section 3: Since Start */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📈 Since You Started</h2>
        <div style={styles.row}>
          <div style={styles.chartBoxWide}>
            <h3>Workout Progress Over Time</h3>
            <LineWorkoutTrend data={workouts.allTime} />
          </div>

          {/* 📤 Export buttons can be added below */}
          {/* TODO: Add CSV/PDF export with button group */}
        </div>
      </section>
    </div>
  );
}

export default ProgressCharts;
