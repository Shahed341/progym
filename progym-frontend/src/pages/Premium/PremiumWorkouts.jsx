import React, { useState, useRef, useEffect, useMemo } from 'react';
import workoutsData from '../../data/PremiumWorkouts.json';
import styles from '../../styles/premium/PWorkoutsStyles';

const categories = ['Chest', 'Arms', 'Back', 'Legs', 'Shoulders', 'Core', 'Full Body'];

function PremiumWorkouts() {
  const [selectedCategory, setSelectedCategory] = useState('Chest');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const sectionRef = useRef(null);

  // Memoize exercises for stable reference
  const exercises = useMemo(
    () => workoutsData[selectedCategory.toLowerCase()] || [],
    [selectedCategory]
  );

  // auto-select first exercise whenever the category changes
  useEffect(() => {
    const list = workoutsData[selectedCategory.toLowerCase()] || [];
    if (list.length) {
      setSelectedExercise(list[0]);
    }
  }, [selectedCategory]);

  /**
   * Scrolls to the workouts section with optional offset.
   */
  const handleScrollToWorkouts = (category, offset = 0) => {
    setSelectedCategory(category);
    setTimeout(() => {
      if (sectionRef.current) {
        const elementTop = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
      }
    }, 0);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>BODY-PART FOCUSED WORKOUTS</h1>
          <p style={styles.heroSubtitle}>
            Targeted workout routines by muscle groups (chest, arms, legs, back, etc.)
          </p>
          <div style={styles.categoryButtonContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleScrollToWorkouts(cat, 100)}
                style={styles.categoryButton(cat === selectedCategory)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={sectionRef} style={styles.sectionContainer}>
        <div style={styles.workoutArea}>
          <div style={styles.sidebarCard}>
            {exercises.map((ex) => (
              <button
                key={ex.name}
                onClick={() => setSelectedExercise(ex)}
                style={styles.sidebarButton(ex.name === selectedExercise?.name)}
              >
                {ex.name}
              </button>
            ))}
          </div>

          <div style={styles.mergedCardColumn}>
            {selectedExercise && (
              <div style={styles.mergedCard(isMobile)}>
                <img
                  src={`/gifs/PremiumWorkouts/${selectedCategory.toLowerCase()}/${selectedExercise.gif}`}
                  alt={selectedExercise.name}
                  style={styles.mergedImage}
                />
                <div style={styles.mergedDetails}>
                  <h3 style={styles.workoutTitle}>{selectedExercise.name}</h3>
                  <p><strong>Target:</strong> {selectedExercise.target}</p>
                  <p><strong>Equipment:</strong> {selectedExercise.equipment}</p>
                  <p><strong>Sets & Reps:</strong> {selectedExercise.setsReps}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PremiumWorkouts;
