// src/pages/PremiumPage.jsx

import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import premiumStyles from '../styles/PremiumPageStyle';

function PremiumPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!user || user.role !== 'premium') {
    return <Navigate to="/" />;
  }

  const premiumFeatures = [
    {
      title: 'Progress Charts',
      path: '/premium/progress-charts',
      image: '/images/premium/progress.png',
      description: 'Visualize your fitness journey with detailed graphs and performance tracking.',
    },
    {
      title: 'AI GymBot Assistant',
      path: '/premium/gymbot',
      image: '/images/premium/gymbot.png',
      description: 'Chat with your smart GymBot for personalized routines and motivation.',
    },
    {
      title: 'Advanced Meal Planning',
      path: '/premium/meal-planner',
      image: '/images/premium/meal.png',
      description: 'Plan and track nutrient-rich meals tailored to your goals and macros.',
    },
    {
      title: 'Supplement Tracker',
      path: '/premium/supplements',
      image: '/images/premium/supplement.png',
      description: 'Stay consistent with supplement intake and get reminders daily.',
    },
    {
      title: 'Premium Workout Routines',
      path: '/premium/workouts',
      image: '/images/premium/workouts.png',
      description: 'Unlock exclusive routines designed by top trainers for serious gains.',
    },
  ];

  return (
    <div style={premiumStyles.fullPage}>
      <div style={premiumStyles.contentWrapper}>
        <section style={premiumStyles.hero}>
          <h1 style={premiumStyles.heroTitle}>Welcome to ProGYM Premium</h1>
          <p style={premiumStyles.heroSubtitle}>
            Unleash your full potential with elite tools and exclusive features.
          </p>
        </section>

        <section style={premiumStyles.gridSection}>
          {premiumFeatures.map((feature, idx) => (
            <Link key={idx} to={feature.path} style={premiumStyles.cardLink}>
              <div
                style={{
                  ...premiumStyles.featureCard,
                  ...(hoveredCard === idx ? premiumStyles.featureCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={premiumStyles.cardImage}
                />
                <div>
                  <h3 style={premiumStyles.cardTitle}>{feature.title}</h3>
                  <p style={premiumStyles.cardText}>{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default PremiumPage;
