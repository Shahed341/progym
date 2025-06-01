// File: src/pages/SupplementGuide.jsx

import React from "react";
import styles from "../styles/SupplementGuideStyles"; // Importing JS-based styles

function SupplementGuide() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Supplement Guide</h1>
      <p style={styles.subtitle}>Learn about common supplements and how they support your fitness goals.</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Protein Powder</h2>
          <p style={styles.cardText}>Helps build and repair muscles after workouts.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Creatine</h2>
          <p style={styles.cardText}>Improves strength and power output during high-intensity workouts.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Multivitamins</h2>
          <p style={styles.cardText}>Supports overall health by filling nutritional gaps.</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>BCAAs</h2>
          <p style={styles.cardText}>Helps with muscle recovery and reduces soreness.</p>
        </div>
      </div>
    </div>
  );
}

export default SupplementGuide;
