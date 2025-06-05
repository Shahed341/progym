import React, { useState } from "react";
import styles from "../styles/ExerciseStyles";

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
  {
    category: "Back",
    exercises: [
      { name: "Deadlifts", target: "Erector Spinae, Glutes, Hamstrings" },
      { name: "Lat Pulldown", target: "Latissimus Dorsi, Biceps" },
      { name: "Seated Row", target: "Middle Back, Rhomboids, Biceps" },
    ],
  },
  {
    category: "Arms",
    exercises: [
      { name: "Bicep Curl", target: "Biceps Brachii" },
      { name: "Tricep Dip", target: "Triceps Brachii" },
      { name: "Hammer Curl", target: "Biceps, Brachialis" },
    ],
  },
];

function ExerciseDetailCard({ name, target }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{name}</h3>
      <p style={styles.cardSubtitle}><strong>Targets:</strong> {target}</p>
    </div>
  );
}

function Exercises() {
  return (
    <div style={styles.page}>
      {/* Fixed top navbar */}
      <nav style={styles.navbar}>
        {exerciseCategories.map(section => (
          <a key={section.category} href={`#${section.category}`} style={styles.navLink}>
            {section.category}
          </a>
        ))}
      </nav>

      {/* Scroll snapping wrapper */}
      <div style={styles.scrollContainer}>
        {exerciseCategories.map(section => (
          <section key={section.category} id={section.category} style={styles.snapSection}>
            <h2 style={styles.categoryTitle}>{section.category}</h2>
            <div style={styles.exerciseList}>
              {section.exercises.map((exercise, i) => (
                <ExerciseDetailCard
                  key={i}
                  name={exercise.name}
                  target={exercise.target}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Exercises;
