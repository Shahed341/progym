// File: src/pages/Home.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/Home';

// Hoverable Feature Card Component
function HoverCard({ to, title, desc, isPremium = false }) {
  const [hover, setHover] = useState(false);

  const cardStyle = {
    ...homeStyles.featureCard,
    ...(hover
      ? isPremium
        ? homeStyles.premiumFeatureCardHover
        : homeStyles.featureCardHover
      : {}),
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Link
      to={to}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}

// Hoverable Button Component
function HoverButton({ to, label, type = 'primary' }) {
  const [hover, setHover] = useState(false);
  const baseStyle = type === 'primary'
    ? homeStyles.primaryButton
    : homeStyles.secondaryButton;
  const hoverStyle = type === 'primary'
    ? homeStyles.primaryButtonHover
    : homeStyles.secondaryButtonHover;

  return (
    <Link
      to={to}
      style={{ ...baseStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Link>
  );
}

// Feature Grid Section
function FeatureSection({ role }) {
  const features = [
    { to: "/track-workout", title: "Track Workouts", desc: "Log sets, reps, and weights to monitor your strength progress." },
    { to: "/meal-plans", title: "Meal Plans", desc: "Customized diet plans tailored to your fitness goals." },
    { to: "/calorie-tracker", title: "Calorie Tracker", desc: "Track your daily calorie intake and expenditure." },
    { to: "/exercises", title: "Exercise Categories", desc: "Browse exercises by body part: Chest, Legs, Arms, Back, Core, etc." },
    { to: "/supplement-guide", title: "Supplements Guide", desc: "Learn about protein powders, creatine, BCAAs, and more." },
    { to: "/weight-loss", title: "Weight Loss Plan", desc: "Structured fat-burning plan with cardio and diet guides." },
    { to: "/muscle-gain", title: "Muscle Gain Plan", desc: "Gain healthy muscle mass with progressive overload tips." },
    { to: "/bulking", title: "Bulking Strategy", desc: "Maximize muscle growth with tailored nutrition and training." },
    { to: "/cutting", title: "Cutting Program", desc: "Drop fat while retaining muscle mass effectively." },
  ];

  const premiumFeatures = [
    { to: "/premium/progress-charts", title: "Progress Charts", desc: "Visualize your improvements with professional graphs and analytics." },
    { to: "/premium/gymbot", title: "AI GymBot", desc: "Real-time assistance with workout queries, nutrition, and motivation." },
  ];

  return (
    <section style={{ ...homeStyles.features, minHeight: '100vh' }}>
      <h2 style={homeStyles.sectionTitle}>Explore Our Core Features</h2>
      <div style={homeStyles.featureGrid}>
        {features.map((feature, index) => (
          <HoverCard key={index} {...feature} />
        ))}

        {role === 'premium' && (
          <>
            {premiumFeatures.map((feature, index) => (
              <HoverCard key={`premium-${index}`} {...feature} isPremium />
            ))}
            <div style={homeStyles.featureCard}>
              <HoverButton to="/premium" label="Use Premium Features" />
            </div>
          </>
        )}

        {role === 'user' && (
          <>
            <div style={homeStyles.featureCard}>
              <h3>Premium Features</h3>
              <p>Unlock advanced analytics and GymBot with our Premium Membership.</p>
            </div>
            <div style={homeStyles.featureCard}>
              <HoverButton to="/upgrade" label="Upgrade to Premium" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Home Component
function Home({ user }) {
  const role = user?.role || null;

  return (
    <div style={homeStyles.container}>
      {/* HERO SECTION */}
      <section style={homeStyles.hero}>
        <div style={homeStyles.heroOverlay}></div>
        <div style={homeStyles.heroContent}>
          <h1 style={homeStyles.heroTitle}>Welcome to ProGYM</h1>
          <p style={homeStyles.heroSubtitle}>Your journey to a healthier, stronger you starts here.</p>
          <div style={homeStyles.heroButtons}>
            {!user && (
              <>
                <HoverButton to="/register" label="Join Now" />
                <HoverButton to="/login" label="Login" type="secondary" />
              </>
            )}
            {role === 'user' && <HoverButton to="/upgrade" label="Upgrade to Premium" />}
            {role === 'premium' && <HoverButton to="/premium" label="Go to Premium Dashboard" />}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeatureSection role={role} />

      {/* PLACEHOLDER SECTION */}
      <section style={homeStyles.placeholderSection}>
        <h2 style={homeStyles.sectionTitle}>Live Progress Dashboard (Coming Soon)</h2>
        <div style={homeStyles.chartPlaceholder}>
          <p>[Insert Chart/Graph Component]</p>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>Success Stories</h2>
        <p style={homeStyles.comingSoon}>Real people. Real transformation. Coming soon.</p>
      </section>

      {/* LOCATION SECTION */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>ProGYM Location</h2>
        <p style={homeStyles.comingSoon}>1234 East West Canada</p>
      </section>
    </div>
  );
}

export default Home;
