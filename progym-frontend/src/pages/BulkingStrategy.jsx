// File: src/pages/BulkingStrategy.jsx

import React from "react";
import bulkingStyles from "../styles/bulkingStrategyStyles"; // ✅ Import the style object

function BulkingSection({ title, food, exercises, rest }) {
  return (
    <div style={bulkingStyles.section}>
      <h2 style={bulkingStyles.sectionTitle}>{title}</h2>

      <h3 style={bulkingStyles.subtitle}>Food & Diet</h3>
      <ul style={bulkingStyles.list}>
        {food.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h3 style={bulkingStyles.subtitle}>Exercises</h3>
      <ul style={bulkingStyles.list}>
        {exercises.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>

      <h3 style={bulkingStyles.subtitle}>Rest & Recovery</h3>
      <ul style={bulkingStyles.list}>
        {rest.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  );
}

function BulkingStrategy() {
  return (
    <div style={bulkingStyles.page}>
      <h1 style={bulkingStyles.title}>Bulking Strategy Guide</h1>

      <BulkingSection
        title="1. From Skinny to Bulking"
        food={[
          "High-calorie meals with quality proteins",
          "Add peanut butter, oats, bananas, and whole milk",
          "Eat every 2–3 hours including snacks"
        ]}
        exercises={[
          "Full-body workouts 3x per week",
          "Focus on compound lifts: squats, deadlifts, bench press",
          "Gradually increase weights"
        ]}
        rest={[
          "7–9 hours of sleep per night",
          "1–2 rest days per week",
          "Avoid overtraining"
        ]}
      />

      <BulkingSection
        title="2. From Normal to Bulking"
        food={[
          "Moderate calorie surplus (300–500 kcal/day)",
          "Balanced macros: 40% carbs, 30% protein, 30% fat",
          "Include lean meats, rice, pasta, eggs, nuts"
        ]}
        exercises={[
          "Push/pull/legs split",
          "Progressive overload with 6–12 reps",
          "Include accessory movements for arms and shoulders"
        ]}
        rest={[
          "Sleep at least 8 hours",
          "Deload every 6–8 weeks",
          "Active recovery on weekends"
        ]}
      />

      <BulkingSection
        title="3. From Fat to Bulking"
        food={[
          "Clean bulk: slight calorie surplus with clean foods",
          "Avoid sugar and refined carbs",
          "Track macros and meal prep"
        ]}
        exercises={[
          "Strength training 4–5x/week",
          "Incorporate HIIT cardio 1–2x/week",
          "Keep rest periods short (30–60s)"
        ]}
        rest={[
          "8+ hours of sleep",
          "Track stress and recovery levels",
          "Stay hydrated"
        ]}
      />
    </div>
  );
}

export default BulkingStrategy;
