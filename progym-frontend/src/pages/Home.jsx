// File: src/pages/Home.jsx

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import homeStyles from '../styles/Home';

function HoverCard({ to, title, desc, icon, isPremium = false }) {
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
    position: 'relative',
    overflow: 'hidden'
  };
  const iconStyle = {
    width: hover ? '100px' : '80px',
    height: hover ? '100px' : '80px',
    transition: 'all 0.3s ease',
    marginBottom: '16px'
  };
  return (
    <Link
      to={to}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon && <img src={icon} alt={title + " Icon"} style={iconStyle} />}
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}

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

function FeatureSection({ role }) {
  const features = [
    { to: "/track-workout", title: "Track Workouts", desc: "Log sets, reps, and weights to monitor your strength progress.", icon: "/images/icons/trackWorkouts.png" },
    { to: "/meal-plans", title: "Meal Plans", desc: "Customized diet plans tailored to your fitness goals.", icon: "/images/icons/mealPlans.png" },
    { to: "/calorie-tracker", title: "Calorie Tracker", desc: "Track your daily calorie intake and expenditure.", icon: "/images/icons/calorieTracker.png" },
    { to: "/exercises", title: "Exercise Categories", desc: "Browse exercises by body part: Chest, Legs, Arms, Back, Core, etc.", icon: "/images/icons/exerciseCategories.png" },
    { to: "/supplement-guide", title: "Supplements Guide", desc: "Learn about protein powders, creatine, BCAAs, and more.", icon: "/images/icons/supplementsGuide.png" },
    { to: "/weight-loss", title: "Weight Loss Plan", desc: "Structured fat-burning plan with cardio and diet guides.", icon: "/images/icons/weightLossPlan.png" },
    { to: "/muscle-gain", title: "Muscle Gain Plan", desc: "Gain healthy muscle mass with progressive overload tips.", icon: "/images/icons/muscleGain.png" },
    { to: "/bulking", title: "Bulking Strategy", desc: "Maximize muscle growth with tailored nutrition and training.", icon: "/images/icons/BulkingStrategy.png" },
    { to: "/cutting", title: "Cutting Program", desc: "Drop fat while retaining muscle mass effectively.", icon: "/images/icons/CuttingProgram.png" },
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

function StoryCard({ before, after, comment, name }) {
  return (
    <div style={homeStyles.storyCard}>
      <div style={homeStyles.storyImages}>
        <img src={before} alt="Before" style={homeStyles.storyImage} />
        <img src={after} alt="After" style={homeStyles.storyImage} />
      </div>
      <p style={homeStyles.storyComment}><strong>{name}:</strong> {comment}</p>
    </div>
  );
}

function SuccessStoriesSection() {
  const scrollRef = useRef();
  const stories = [
    {
      before: '/images/stories/before1.jpg',
      after: '/images/stories/after1.jpg',
      comment: 'Lost 20 pounds and gained confidence!',
      name: 'Sarah'
    },
    {
      before: '/images/stories/before2.jpg',
      after: '/images/stories/after2.jpg',
      comment: 'My energy and strength are through the roof.',
      name: 'Jason'
    },
    {
      before: '/images/stories/before3.jpg',
      after: '/images/stories/after3.jpg',
      comment: 'From skinny to shredded! Thanks ProGYM!',
      name: 'Laura'
    }
  ];
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };
  return (
    <section style={homeStyles.successStoriesSection}>
      <h2 style={homeStyles.sectionTitle}>Success Stories</h2>
      <button onClick={() => scroll('left')} style={{ ...homeStyles.storyNavButton, ...homeStyles.storyNavLeft }}>{'<'}</button>
      <div ref={scrollRef} style={homeStyles.storyGridScrollContainer}>
        {stories.map((story, idx) => (
          <StoryCard key={idx} {...story} />
        ))}
      </div>
      <button onClick={() => scroll('right')} style={{ ...homeStyles.storyNavButton, ...homeStyles.storyNavRight }}>{'>'}</button>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <HoverButton to="/submit-story" label="Post Your Story" />
      </div>
    </section>
  );
}

function Home({ user }) {
  const role = user?.role || null;
  return (
    <div style={homeStyles.container}>
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
      <FeatureSection role={role} />
      <section style={homeStyles.placeholderSection}>
        <h2 style={homeStyles.sectionTitle}>Live Progress Dashboard (Coming Soon)</h2>
        <div style={homeStyles.chartPlaceholder}>
          <p>[Insert Chart/Graph Component]</p>
        </div>
      </section>
      <SuccessStoriesSection />
      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>ProGYM Location</h2>
        <p style={homeStyles.comingSoon}>1234 East West Canada</p>
      </section>
    </div>
  );
}

export default Home;
