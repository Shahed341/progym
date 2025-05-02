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
      {/* Hero section */}
      <section style={premiumStyles.hero}>
        <h1 style={premiumStyles.heroTitle}>Welcome to the Premium Experience</h1>
        <p style={premiumStyles.heroSubtitle}>
          Unlock your full potential with exclusive ProGYM tools.
        </p>
      </section>

      {/* Feature list section */}
      <section>
        <h2 style={premiumStyles.sectionTitle}>Premium Feature Access</h2>
        <div style={premiumStyles.featureGrid}>
          {premiumFeatures.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.path}
              style={premiumStyles.featureButton}
            >
              {feature.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PremiumPage;
