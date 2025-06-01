// File: src/pages/CuttingStrategy.jsx

import React from "react";
import bulkingStyles from "../styles/bulkingStrategyStyles"; // Reuse existing styles

function CuttingSection({ title, food, exercises, rest }) {
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

function CuttingStrategy() {
  return (
    <div style={bulkingStyles.page}>
      <h1 style={bulkingStyles.title}>Cutting Strategy Guide</h1>

      <CuttingSection
        title="1. From Bulky to Lean"
        food={[
          "Calorie deficit with high-protein meals",
          "Reduce carbs, avoid sugar-heavy snacks",
          "Hydrate often and track macros"
        ]}
        exercises={[
          "Circuit training 3–4x/week",
          "Moderate weights with high reps",
          "HIIT sessions twice a week"
        ]}
        rest={[
          "8+ hours of sleep",
          "Active recovery days",
          "Stretching and mobility work"
        ]}
      />

      <CuttingSection
        title="2. From Average to Defined"
        food={[
          "Slight calorie reduction",
          "Focus on lean proteins, veggies, and whole grains",
          "Frequent small meals"
        ]}
        exercises={[
          "Strength training 4x/week",
          "Cardio post-workout (20–30 min)",
          "Core-focused training"
        ]}
        rest={[
          "Quality sleep",
          "Avoid training to failure daily",
          "Foam rolling regularly"
        ]}
      />

      <CuttingSection
        title="3. From Overweight to Toned"
        food={[
          "Aggressive calorie cut (under supervision)",
          "Meal prep and eliminate junk food",
          "Track daily intake strictly"
        ]}
        exercises={[
          "Daily walks + gym 4–5x/week",
          "HIIT cardio and bodyweight strength",
          "Increase NEAT (non-exercise activity thermogenesis)"
        ]}
        rest={[
          "Consistency with bedtime",
          "Reduce stress and caffeine",
          "Recovery-focused off days"
        ]}
      />
    </div>
  );
}

export default CuttingStrategy;
