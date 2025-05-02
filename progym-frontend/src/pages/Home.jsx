// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/Home'; // JS-based inline styles

function FeatureSection({ role }) {
  return (
    <section style={{ ...homeStyles.features, minHeight: '100vh' }}>
      <h2 style={homeStyles.sectionTitle}>Explore Our Core Features</h2>
      <div style={homeStyles.featureGrid}>
        {/* Core Features for all users */}
        <div style={homeStyles.featureCard}>
          <h3>Track Workouts</h3>
          <p>Log sets, reps, and weights to monitor your strength progress.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Meal Plans</h3>
          <p>Customized diet plans tailored to your fitness goals.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Calorie Tracker</h3>
          <p>Track your daily calorie intake and expenditure.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Exercise Categories</h3>
          <p>Browse exercises by body part: Chest, Legs, Arms, Back, Core, etc.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Supplements Guide</h3>
          <p>Learn about protein powders, creatine, BCAAs, and more.</p>
        </div>

        {/* Additional plans */}
        <div style={homeStyles.featureCard}>
          <h3>Weight Loss Plan</h3>
          <p>Structured fat-burning plan with cardio and diet guides.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Muscle Gain Plan</h3>
          <p>Gain healthy muscle mass with progressive overload tips.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Bulking Strategy</h3>
          <p>Maximize muscle growth with tailored nutrition and training.</p>
        </div>

        <div style={homeStyles.featureCard}>
          <h3>Cutting Program</h3>
          <p>Drop fat while retaining muscle mass effectively.</p>
        </div>

        {/* Premium Features */}
        {role === 'premium' && (
          <>
            <div style={homeStyles.featureCard}>
              <h3>Progress Charts</h3>
              <p>Visualize your improvements with professional graphs and analytics.</p>
            </div>

            <div style={homeStyles.featureCard}>
              <h3>AI GymBot</h3>
              <p>Real-time assistance with workout queries, nutrition, and motivation.</p>
            </div>

            <div style={homeStyles.featureCard}>
              <Link to="/premium" style={homeStyles.primaryButton}>Use Premium Features</Link>
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
              <Link to="/upgrade" style={homeStyles.primaryButton}>Upgrade to Premium</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Home({ user }) {
  const role = user?.role || null;

  return (
    <div style={homeStyles.container}>
      {/* ===== HERO SECTION ===== */}
      <section style={homeStyles.hero}>
        <h1 style={homeStyles.heroTitle}>Welcome to ProGYM</h1>
        <p style={homeStyles.heroSubtitle}>
          Your journey to a healthier, stronger you starts here.
        </p>
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
      </section>

      {/* ===== FEATURES SECTION (full-screen) ===== */}
      <FeatureSection role={role} />

      {/* ===== PROGRESS SECTION PLACEHOLDER ===== */}
      <section style={homeStyles.placeholderSection}>
        <h2 style={homeStyles.sectionTitle}>Live Progress Dashboard (Coming Soon)</h2>
        <div style={homeStyles.chartPlaceholder}>
          <p>[Insert Chart/Graph Component]</p>
        </div>
      </section>

      {/* ===== TESTIMONIALS PLACEHOLDER ===== */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>Success Stories</h2>
        <p style={homeStyles.comingSoon}>Real people. Real transformation. Coming soon.</p>
      </section>

      {/* ===== Address Section ===== */}
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>ProGYM Location</h2>
        <p style={homeStyles.comingSoon}>1234 East West Canada</p>
      </section>
    </div>
  );
}

export default Home;
