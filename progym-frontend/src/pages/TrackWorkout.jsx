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
import WorkoutCharts from '../components/WorkoutCharts';

const workoutOptions = {
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly'],
  Arms: ['Bicep Curl', 'Tricep Extension', 'Hammer Curl'],
  Legs: ['Squats', 'Leg Press', 'Lunges'],
  Back: ['Deadlift', 'Lat Pulldown', 'Barbell Row'],
  Shoulders: ['Shoulder Press', 'Lateral Raise', 'Front Raise'],
  Others: ['Jump Rope', 'Burpees', 'Mountain Climbers']
};

const bodyParts = Object.keys(workoutOptions);

const TrackWorkout = () => {
  const [category, setCategory] = useState('Chest');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [inputData, setInputData] = useState({
    sets: '',
    reps: '',
    weight: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [workouts, setWorkouts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [hoverSave, setHoverSave] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/workouts');
      const data = Array.isArray(res.data)
        ? res.data.map((w) => ({
            ...w,
            date: w.date?.split('T')[0] || w.date,
          }))
        : [];
      setWorkouts(data);
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
      setInputData({
        sets: '',
        reps: '',
        weight: '',
        date: new Date().toISOString().split('T')[0],
      });
      setSelectedExercise(null);
      setSuccessMessage('Workout added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving workout:', err);
    }
  };

  const filteredData = selectedExercise
    ? workouts.filter((w) => w.exercise === selectedExercise)
    : workouts;

  const radarData = ['Chest', 'Arms', 'Legs', 'Back', 'Shoulders'].map(group => ({
    group,
    volume: workouts
      .filter(w => w.category === group)
      .reduce((sum, w) => sum + w.sets * w.reps * w.weight, 0),
  }));

  const pieData = radarData.map(d => ({ name: d.group, value: d.volume }));

  const scatterData = workouts.map(w => ({
    weight: Number(w.weight),
    reps: Number(w.reps),
  }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Track Your Workout</h1>

      <div style={styles.fixedCategoryHeader}>
        <h2 style={styles.subTitle}>Select Workout Type</h2>
        <div style={styles.gridBodyParts}>
          {bodyParts.map((part) => (
            <div
              key={part}
              style={styles.bodyCard(category === part)}
              onClick={() => setCategory(part)}
            >
              <img src={`/images/${part.toLowerCase()}.png`} alt={part} style={styles.bodyImage} />
              <span>{part}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 style={styles.subTitle}>Select Exercise</h2>
      <div style={styles.gridExercises}>
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

      {selectedExercise && (
        <div style={styles.inputPanel}>
          <h2 style={styles.subTitle}>Log: {selectedExercise}</h2>
          <div style={styles.inputGroupPremium}>
            <input
              name="sets"
              value={inputData.sets}
              onChange={handleInputChange}
              type="number"
              placeholder="Sets"
              style={styles.inputPremium}
            />
            <input
              name="reps"
              value={inputData.reps}
              onChange={handleInputChange}
              type="number"
              placeholder="Reps"
              style={styles.inputPremium}
            />
            <input
              name="weight"
              value={inputData.weight}
              onChange={handleInputChange}
              type="number"
              placeholder="Weight"
              style={styles.inputPremium}
            />
            <input
              name="date"
              value={inputData.date}
              onChange={handleInputChange}
              type="date"
              style={styles.inputPremium}
            />
          </div>
          <button
            onClick={handleSave}
            onMouseEnter={() => setHoverSave(true)}
            onMouseLeave={() => setHoverSave(false)}
            style={{
              ...styles.button,
              ...(hoverSave ? styles.buttonHover : {}),
            }}
          >
            Save Workout
          </button>
          {successMessage && (
            <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
          )}
        </div>
      )}

      <h2 style={styles.chartTitle}>Visual Analytics</h2>
      <WorkoutCharts
        data={filteredData.map(d => ({
          ...d,
          volume: d.sets * d.reps * d.weight
        }))}
        radarData={radarData}
        pieData={pieData}
        scatterData={scatterData}
      />
    </div>
  );
};

export default TrackWorkout;