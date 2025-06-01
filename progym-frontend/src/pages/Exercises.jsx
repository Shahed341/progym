// File: src/pages/Exercises.js

import React, { useState } from "react";
import styles from "../styles/ExerciseStyles";

// Static exercise data with muscle group info
const exerciseCategories = [
  {
    category: "Chest",
    exercises: [
      { name: "Bench Press", target: "Pectoralis Major, Triceps, Deltoids" },
      { name: "Push-ups", target: "Pectoralis Major, Triceps, Core" },
      { name: "Chest Fly", target: "Pectoralis Major" },
    ],
  },
  {
    category: "Legs",
    exercises: [
      { name: "Squats", target: "Quadriceps, Glutes, Hamstrings" },
      { name: "Lunges", target: "Glutes, Hamstrings, Calves" },
      { name: "Leg Press", target: "Quadriceps, Glutes" },
    ],
  },
];

function ExerciseDetailCard({ name, target, isOpen, toggle }) {
  return (
    <div style={styles.cardPremium} onClick={toggle}>
      <h3 style={styles.cardTitle}>{name}</h3>
      {isOpen && (
        <p style={styles.cardSubtitle}><strong>Targets:</strong> {target}</p>
      )}
    </div>
  );
}

function Exercises() {
  const [openExercise, setOpenExercise] = useState(null);

  const toggleExercise = (exerciseName) => {
    setOpenExercise((prev) => (prev === exerciseName ? null : exerciseName));
  };

  return (
    <div style={styles.pagePremium}>
      <h1 style={styles.pageTitle}>Explore Exercises</h1>

      {exerciseCategories.map((section) => (
        <div key={section.category} style={styles.categorySection}>
          <h2 style={{ ...styles.categoryTitle, padding: "1rem 1.5rem", backgroundColor: "#3b82f6", color: "#fff" }}>
            {section.category}
          </h2>

          <div style={styles.exerciseGrid}>
            {section.exercises.map((exercise, index) => (
              <ExerciseDetailCard
                key={index}
                name={exercise.name}
                target={exercise.target}
                isOpen={openExercise === exercise.name}
                toggle={() => toggleExercise(exercise.name)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Exercises;
