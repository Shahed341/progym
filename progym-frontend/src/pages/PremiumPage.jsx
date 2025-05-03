// src/pages/PremiumPage.jsx

import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import premiumStyles from '../styles/PremiumPageStyle';

function PremiumPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect non-premium users
  if (!user || user.role !== 'premium') {
    return <Navigate to="/" />;
  }

  const premiumFeatures = [
    { title: 'Progress Charts', path: '/premium/progress-charts' },
    { title: 'AI GymBot Assistant', path: '/premium/gymbot' },
    { title: 'Advanced Meal Planning', path: '/premium/meal-planner' },
    { title: 'Supplement Tracker', path: '/premium/supplements' },
    { title: 'Premium Workout Routines', path: '/premium/workouts' },
  ];

  return (
    <div style={premiumStyles.container}>
      {/* ===== SIMPLE HERO SECTION (no background) ===== */}
      <section style={premiumStyles.hero}>
        <h1 style={premiumStyles.heroTitle}>Welcome to the Premium Experience</h1>
        <p style={premiumStyles.heroSubtitle}>
          Unlock your full potential with exclusive ProGYM tools.
        </p>
      </section>

      {/* ===== PREMIUM FEATURES GRID ===== */}
      <section>
        <h2 style={premiumStyles.sectionTitle}>Premium Feature Access</h2>
        <div style={premiumStyles.featureGrid}>
          {premiumFeatures.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              style={premiumStyles.featureCardLink}
            >
              <div style={premiumStyles.featureCard}>
                <h3>{feature.title}</h3>
                <p>Click to explore</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PremiumPage;
