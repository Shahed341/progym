// File: src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/Home'; // JS-based inline style object

// Section: Core Features Grid
function FeatureSection({ role }) {
  const noUnderlineStyle = { textDecoration: 'none', color: 'inherit' };

  return (
    <section style={{ ...homeStyles.features, minHeight: '100vh' }}>
      <h2 style={homeStyles.sectionTitle}>Explore Our Core Features</h2>
      <div style={homeStyles.featureGrid}>

        {/* Default features available to all users */}
        <Link to="/track-workout" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Track Workouts</h3>
          <p>Log sets, reps, and weights to monitor your strength progress.</p>
        </Link>
        <Link to="/meal-plans" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Meal Plans</h3>
          <p>Customized diet plans tailored to your fitness goals.</p>
        </Link>
        <Link to="/calorie-tracker" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Calorie Tracker</h3>
          <p>Track your daily calorie intake and expenditure.</p>
        </Link>
        <Link to="/exercises" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Exercise Categories</h3>
          <p>Browse exercises by body part: Chest, Legs, Arms, Back, Core, etc.</p>
        </Link>
        <Link to="/supplement-guide" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Supplements Guide</h3>
          <p>Learn about protein powders, creatine, BCAAs, and more.</p>
        </Link>
        <Link to="/weight-loss" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Weight Loss Plan</h3>
          <p>Structured fat-burning plan with cardio and diet guides.</p>
        </Link>
        <Link to="/muscle-gain" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Muscle Gain Plan</h3>
          <p>Gain healthy muscle mass with progressive overload tips.</p>
        </Link>
        <Link to="/bulking" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Bulking Strategy</h3>
          <p>Maximize muscle growth with tailored nutrition and training.</p>
        </Link>
        <Link to="/cutting" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
          <h3>Cutting Program</h3>
          <p>Drop fat while retaining muscle mass effectively.</p>
        </Link>

        {/* Premium-only features */}
        {role === 'premium' && (
          <>
            <Link to="/premium/progress-charts" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
              <h3>Progress Charts</h3>
              <p>Visualize your improvements with professional graphs and analytics.</p>
            </Link>
            <Link to="/premium/gymbot" style={{ ...homeStyles.featureCard, ...noUnderlineStyle }}>
              <h3>AI GymBot</h3>
              <p>Real-time assistance with workout queries, nutrition, and motivation.</p>
            </Link>
            <div style={homeStyles.featureCard}>
              <Link to="/premium" style={{ ...homeStyles.primaryButton, ...noUnderlineStyle }}>Use Premium Features</Link>
            </div>
          </>
        )}

        {/* Upsell for standard users */}
        {role === 'user' && (
          <>
            <div style={homeStyles.featureCard}>
              <h3>Premium Features</h3>
              <p>Unlock advanced analytics and GymBot with our Premium Membership.</p>
            </div>
            <div style={homeStyles.featureCard}>
              <Link to="/upgrade" style={{ ...homeStyles.primaryButton, ...noUnderlineStyle }}>Upgrade to Premium</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Main Home Component
function Home({ user }) {
  const role = user?.role || null;

  return (
    <div style={homeStyles.container}>
      {/* HERO SECTION */}
      <section style={homeStyles.hero}>
        <div style={homeStyles.heroOverlay}></div>
        <div style={homeStyles.heroContent}>
          <h1 style={homeStyles.heroTitle}>Welcome to ProGYM</h1>
          <p style={homeStyles.heroSubtitle}>
            Your journey to a healthier, stronger you starts here.
          </p>

          {/* Conditional buttons based on user role */}
          <div style={homeStyles.heroButtons}>
            {!user && (
              <>
                <Link to="/register" style={homeStyles.primaryButton}>Join Now</Link>
                <Link to="/login" style={homeStyles.secondaryButton}>Login</Link>
              </>
            )}
            {role === 'user' && (
              <Link to="/upgrade" style={homeStyles.primaryButton}>Upgrade to Premium</Link>
            )}
            {role === 'premium' && (
              <Link to="/premium" style={homeStyles.primaryButton}>Go to Premium Dashboard</Link>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <FeatureSection role={role} />

      {/* PROGRESS CHART PLACEHOLDER */}
      <section style={homeStyles.placeholderSection}>
        <h2 style={homeStyles.sectionTitle}>Live Progress Dashboard (Coming Soon)</h2>
        <div style={homeStyles.chartPlaceholder}>
          <p>[Insert Chart/Graph Component]</p>
        </div>
      </section>

      {/* TESTIMONIAL PLACEHOLDER */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>Success Stories</h2>
        <p style={homeStyles.comingSoon}>Real people. Real transformation. Coming soon.</p>
      </section>

      {/* LOCATION FOOTER */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>ProGYM Location</h2>
        <p style={homeStyles.comingSoon}>1234 East West Canada</p>
      </section>
    </div>
  );
}

export default Home;
