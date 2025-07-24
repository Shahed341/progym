// src/pages/Supplements.jsx
import React, { useState, useRef } from 'react';
import styles from '../../styles/premium/SupplementsStyles';
import supplements from '../../data/Supplements.json';

export default function Supplements() {
  const [activeId, setActiveId] = useState(supplements[0].id);
  const contentRef = useRef(null);

  const active = supplements.find(item => item.id === activeId);

  const handleClick = (id) => {
    setActiveId(id);

    // Smooth scroll to content after slight delay
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
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Supplements</h1>
          <p style={styles.heroSubtitle}>
            Recommendations and reviews of supplements based on your fitness goal.
          </p>
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

      {/* CONTENT */}
      {active && (
        <>
          <div ref={contentRef} style={styles.contentGrid}>
            {/* Image Card */}
            <div style={styles.card}>
              <img src={active.image} alt={active.name} style={styles.imageStyle} />
              <h2 style={styles.cardTitle}>{active.name}</h2>
            </div>

            {/* Benefits and Side Effects */}
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

          {/* Usage Guide */}
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
