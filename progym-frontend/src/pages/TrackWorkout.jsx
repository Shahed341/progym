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
  Chest: [
    'Push-Ups', 'Incline Push-Ups', 'Decline Push-Ups', 'Clap Push-Ups', 'Archer Push-Ups', 'Chest Dips',
    'Dumbbell Bench Press', 'Incline Dumbbell Press', 'Dumbbell Flyes', 'Dumbbell Pullover',
    'Barbell Bench Press', 'Close-Grip Bench Press', 'Floor Press',
    'Cable Crossover', 'Seated Chest Press', 'Pec Deck Machine', 'Smith Machine Bench Press',
    'Band Chest Press', 'Band Flyes', 'Band Push-Ups',
    'Guillotine Press', 'Svend Press', 'Isometric Chest Holds'
  ],
  Arms: [
    'Bicep Curl', 'Hammer Curl', 'Concentration Curl', 'Incline Dumbbell Curl', 'Zottman Curl', 'Cross-Body Hammer Curl',
    'Dumbbell Preacher Curl', 'Alternating Dumbbell Curl', 'Drag Curl',
    'Barbell Curl', 'Wide-Grip Barbell Curl', 'Close-Grip Barbell Curl', 'Reverse Curl', '21s', 'Cheat Curl',
    'Cable Curl', 'Rope Hammer Curl', 'Cable Preacher Curl', 'High Cable Curl', 'Machine Biceps Curl',
    'Resistance Band Curl', 'Suspension Trainer Curl', 'Isometric Hold Curl', 'Tempo Curl', 'Seated Curl'
  ],
  Triceps: [
    'Triceps Dips', 'Close-Grip Push-Ups', 'Diamond Push-Ups', 'Pike Push-Up to Triceps Extension', 'Wall Triceps Extensions',
    'Overhead Dumbbell Extension', 'Dumbbell Kickbacks', 'Skull Crushers', 'Tate Press', 'Dumbbell Floor Press',
    'Close-Grip Bench Press', 'EZ Bar Skull Crushers', 'JM Press', 'Overhead Barbell Extension', 'Barbell Floor Press',
    'Triceps Pushdown', 'Overhead Cable Extension', 'Single-Arm Cable Pushdown', 'Reverse Cable Pushdown', 'Cable Kickbacks', 'Machine Dips',
    'Band Triceps Extensions', 'Band Kickbacks', 'Plate Overhead Extension', 'Isometric Triceps Press'
  ],
  Back: [
    'Pull-Ups', 'Inverted Rows', 'Superman Hold', 'Reverse Snow Angels', 'Wall Slides', 'Table Rows',
    'One-Arm Dumbbell Row', 'Bent-Over Dumbbell Row', 'Dumbbell Deadlift', 'Dumbbell Shrug', 'Renegade Row', 'Incline Dumbbell Row',
    'Barbell Deadlift', 'Barbell Row', 'Pendlay Row', 'T-Bar Row', 'Shrugs', 'Rack Pulls',
    'Lat Pulldown', 'Seated Cable Row', 'Cable Face Pull', 'Machine Row', 'Standing Lat Pushdown', 'Cable Straight Arm Pulldown',
    'Band Row', 'Band Face Pulls', 'Kettlebell Swings', 'Good Mornings', 'Landmine Row'
  ],
  Legs: [
    'Bodyweight Squats', 'Jump Squats', 'Lunges', 'Bulgarian Split Squats', 'Step-Ups', 'Wall Sit', 'Glute Bridges', 'Calf Raises',
    'Goblet Squat', 'Walking Lunge', 'Dumbbell Step-Up', 'Dumbbell Romanian Deadlift', 'Dumbbell Bulgarian Split Squat', 'Dumbbell Sumo Squat', 'Dumbbell Calf Raises',
    'Back Squat', 'Front Squat', 'Deadlift', 'Romanian Deadlift', 'Good Morning', 'Barbell Hip Thrust', 'Zercher Squat',
    'Leg Press', 'Leg Curl Machine', 'Leg Extension Machine', 'Smith Machine Squat', 'Glute Kickback Machine', 'Calf Raise Machine', 'Cable Lateral Leg Raise',
    'Band Squats', 'Band Lateral Walks', 'Band Glute Bridges', 'Band Kickbacks', 'Kettlebell Swings'
  ],
  Shoulders: [
    'Pike Push-Ups', 'Handstand Push-Ups', 'Wall Walks', 'Arm Circles', 'Plank to Downward Dog',
    'Dumbbell Shoulder Press', 'Lateral Raise', 'Front Raise', 'Rear Delt Fly', 'Arnold Press', 'Dumbbell Shrugs', 'Cuban Rotation', 'Dumbbell Upright Row',
    'Overhead Press', 'Push Press', 'Barbell Upright Row', 'Behind-the-Neck Press', 'Barbell Shrugs',
    'Cable Lateral Raise', 'Cable Front Raise', 'Cable Face Pulls', 'Machine Shoulder Press', 'Reverse Pec Deck', 'Cable Rear Delt Fly',
    'Kettlebell Press', 'Kettlebell High Pull', 'Band Shoulder Press', 'Band Lateral Raise', 'Plate Raises', 'YTW Raises'
  ],
  Abs: [
    'Crunches', 'Sit-Ups', 'Leg Raises', 'V-Ups', 'Flutter Kicks', 'Mountain Climbers', 'Russian Twists', 'Planks', 'Hollow Body Hold', 'Dead Bug',
    'Weighted Sit-Ups', 'Dumbbell Russian Twists', 'Weighted Leg Raises', 'Dumbbell Side Bend', 'Dumbbell Crunch', 'Dumbbell Plank Pull-Throughs',
    'Cable Crunches', 'Cable Woodchopper', 'Ab Crunch Machine', 'Hanging Leg Raise', 'Captains Chair Knee Raise',
    'Band Rotations', 'Band Plank Pulls', 'Ball Crunches', 'Ball Rollouts', 'Ball Pike',
    'Dragon Flag', 'L-Sit Hold', 'Toes-to-Bar', 'Ab Wheel Rollouts', 'Windshield Wipers'
  ]
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