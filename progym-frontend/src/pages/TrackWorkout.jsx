// File: progym-frontend/src/pages/TrackWorkout.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from '../styles/TrackWorkout';

const workoutOptions = {
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly'],
  Arms: ['Bicep Curl', 'Tricep Extension', 'Hammer Curl'],
  Legs: ['Squats', 'Leg Press', 'Lunges'],
  Back: ['Deadlift', 'Lat Pulldown', 'Barbell Row'],
  Shoulders: ['Shoulder Press', 'Lateral Raise', 'Front Raise'],
};

const TrackWorkout = () => {
  const [category, setCategory] = useState('Chest');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [inputData, setInputData] = useState({ sets: '', reps: '', weight: '', date: new Date().toISOString().split('T')[0] });
  const [workouts, setWorkouts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/workouts');
      const data = Array.isArray(res.data)
        ? res.data.map(w => ({ ...w, date: w.date?.split('T')[0] || w.date }))
        : [];
      setWorkouts(data);
      console.log('[TrackWorkout] Fetched workouts:', data);
    } catch (err) {
      console.error('Failed to fetch workouts:', err);
      setWorkouts([]);
    }
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!selectedExercise) return;

    const newWorkout = {
      category,
      exercise: selectedExercise,
      sets: inputData.sets,
      reps: inputData.reps,
      weight: inputData.weight,
      date: inputData.date,
    };

    try {
      await axios.post('http://localhost:5000/api/workouts', newWorkout);
      fetchWorkouts();
      setInputData({ sets: '', reps: '', weight: '', date: new Date().toISOString().split('T')[0] });
      setSelectedExercise(null);
      setSuccessMessage('Workout added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving workout:', err);
    }
  };

  const filteredData = selectedExercise
    ? workouts.filter(w => w.exercise === selectedExercise)
    : workouts;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Track Your Workout</h1>

      {/* Category Selector */}
      <div style={styles.selector}>
        <label><strong>Select Category:</strong></label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.dropdown}>
          {Object.keys(workoutOptions).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Exercise Grid */}
      <div style={styles.grid}>
        {workoutOptions[category].map((exercise) => (
          <div
            key={exercise}
            onClick={() => handleExerciseClick(exercise)}
            style={styles.exerciseCard(selectedExercise === exercise)}
          >
            {exercise}
          </div>
        ))}
      </div>

      {/* Dynamic Input Fields */}
      {selectedExercise && (
        <div style={styles.inputPanel}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Log: {selectedExercise}</h2>
          <div style={styles.inputGroup}>
            <input name="sets" value={inputData.sets} onChange={handleInputChange} type="number" placeholder="Sets" style={styles.input} />
            <input name="reps" value={inputData.reps} onChange={handleInputChange} type="number" placeholder="Reps" style={styles.input} />
            <input name="weight" value={inputData.weight} onChange={handleInputChange} type="number" placeholder="Weight" style={styles.input} />
            <input name="date" value={inputData.date} onChange={handleInputChange} type="date" style={styles.input} />
          </div>
          <button onClick={handleSave} style={styles.button}>Save Workout</button>
          {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
        </div>
      )}

      {/* Progress Chart */}
      <h2 className="text-2xl font-semibold mb-2">Progress Chart</h2>

      {filteredData.length === 0 ? (
        <p>No workout data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="weight" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight Lifted" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TrackWorkout;
