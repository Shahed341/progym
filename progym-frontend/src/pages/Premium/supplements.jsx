// File path: src/pages/premium/Supplements.jsx
// This component displays a Supplements page with a hero section and dynamic content 
// (benefits, side effects, usage) for each supplement based on user selection.
// Styling is applied from an external JS style object located in styles/premium/SupplementsStyles.js.

import React, { useState, useRef } from 'react';
import styles from '../../styles/premium/SupplementsStyle';
import supplements from '../../data/Supplements.json';

export default function Supplements() {
  // Track the currently active supplement ID
  const [activeId, setActiveId] = useState(supplements[0].id);
  const contentRef = useRef(null); // Reference to scroll to content section

  // Find the full supplement object based on the current ID
  const active = supplements.find(item => item.id === activeId);

  // Handle switching between supplements and scroll to content
  const handleClick = (id) => {
    setActiveId(id);

    // Smooth scroll to the content after selecting a supplement
    setTimeout(() => {
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const yOffset = contentRef.current.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={styles.pageContainer}>
      {/* HERO SECTION */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay} /> {/* Translucent overlay for effect */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Supplements</h1>
          <p style={styles.heroSubtitle}>
            Recommendations and reviews of supplements based on your fitness goal.
          </p>

          {/* Navigation buttons for switching between supplements */}
          <div style={styles.buttonGroup}>
            {supplements.map(item => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                style={{
                  ...styles.button,
                  ...(item.id === activeId
                    ? styles.buttonActive
                    : styles.buttonInactive),
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT: shows only when an item is active */}
      {active && (
        <>
          <div ref={contentRef} style={styles.contentGrid}>
            {/* Image card for supplement */}
            <div style={styles.card}>
              <img src={active.image} alt={active.name} style={styles.imageStyle} />
              <h2 style={styles.cardTitle}>{active.name}</h2>
            </div>

            {/* Benefits and side effects displayed in two separate cards */}
            <div style={styles.rightColumn}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Benefits</h3>
                <ul style={styles.list}>
                  {active.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Side Effects</h3>
                <ul style={styles.list}>
                  {active.sideEffects.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Usage guide listed below main content */}
          <div style={styles.usageCard}>
            <h3 style={styles.cardTitle}>Usage Guide</h3>
            <ul style={styles.list}>
              {active.usageGuide.map((u, i) => <li key={i}>{u}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
