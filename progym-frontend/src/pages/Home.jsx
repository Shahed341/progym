import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import homeStyles from '../styles/Home';

function HoverCard({ to, title, desc, icon, isPremium = false, isLocked = false }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    ...homeStyles.featureCard,
    ...(hover && !isLocked && homeStyles.featureCardHover),
    ...(hover && isPremium && homeStyles.premiumFeatureCardHover),
    textDecoration: 'none',
    color: 'inherit',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer'
  };

  const iconStyle = {
    width: hover ? '100px' : '80px',
    height: hover ? '100px' : '80px',
    transition: 'all 0.3s ease',
    marginBottom: '16px'
  };

  const titleStyle = {
    color: isPremium ? '#D80000' : '#1A3636',
    fontWeight: 600
  };

  const handleClick = (e) => {
    if (isLocked) {
      e.preventDefault();
      alert('🚫 This is a premium feature. Please upgrade to access.');
    } else {
      navigate(to);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon && <img src={icon} alt={`${title} Icon`} style={iconStyle} />}
      <h3 style={titleStyle}>{title}</h3>
      <p>{desc}</p>
    </div>
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
  const isPremiumUser = role === 'premium';

  const premiumFeatures = [
    { to: "/premium/progress-charts", title: "Progress Charts", desc: "Visualize your improvements with graphs and analytics.", icon: "/images/icons/progressCharts.png" },
    { to: "/premium/gymbot", title: "AI GymBot", desc: "Real-time assistance with workout queries, nutrition, and motivation.", icon: "/images/icons/gymbot.png" },
    { to: "/premium/meal-planner", title: "Advanced Meal Planner", desc: "Customize meals based on goals and preferences.", icon: "/images/icons/mealPlans.png" },
    { to: "/premium/supplements", title: "Supplement Tracker", desc: "Track and manage your supplement intake.", icon: "/images/icons/supplementsGuide.png" },
    { to: "/premium/workouts", title: "Premium Workouts", desc: "Exclusive routines tailored for premium members.", icon: "/images/icons/premiumWorkouts.png" },
  ];

  const basicFeatures = [
    { to: "/track-workout", title: "Track Workouts", desc: "Log sets, reps, and weights to monitor your strength progress.", icon: "/images/icons/trackWorkouts.png" },
    { to: "/calorie-tracker", title: "Calorie Tracker", desc: "Track your daily calorie intake and expenditure.", icon: "/images/icons/calorieTracker.png" },
    { to: "/exercises", title: "Exercise Categories", desc: "Browse exercises by body part: Chest, Legs, Arms, Back, Core, etc.", icon: "/images/icons/exerciseCategories.png" },
    { to: "/weight-loss", title: "Weight Loss Plan", desc: "Structured fat-burning plan with cardio and diet guides.", icon: "/images/icons/weightLossPlan.png" },
    { to: "/muscle-gain", title: "Muscle Gain Plan", desc: "Gain healthy muscle mass with progressive overload tips.", icon: "/images/icons/muscleGain.png" },
    { to: "/bulking", title: "Bulking Strategy", desc: "Maximize muscle growth with tailored nutrition and training.", icon: "/images/icons/BulkingStrategy.png" },
    { to: "/cutting", title: "Cutting Program", desc: "Drop fat while retaining muscle mass effectively.", icon: "/images/icons/CuttingProgram.png" },
  ];

  const allFeatures = [
    ...premiumFeatures.map(f => ({ ...f, isPremium: true, isLocked: !isPremiumUser })),
    ...basicFeatures.map(f => ({ ...f, isPremium: false, isLocked: false })),
  ];

  return (
    <section style={{ ...homeStyles.features, minHeight: '100vh' }}>
      <h2 style={homeStyles.sectionTitle}>Your Features</h2>
      <div style={homeStyles.featureGrid}>
        {allFeatures.map((feature, index) => (
          <HoverCard key={index} {...feature} />
        ))}
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

      <section style={homeStyles.testimonials}>
        <h2 style={homeStyles.sectionTitle}>ProGYM Location</h2>
        <p style={homeStyles.comingSoon}>1234 East West Canada</p>
        <iframe
          title="ProGYM Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.7977553915154!2d-106.6344717230323!3d52.13151597196496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5304f725b171c67d%3A0xd4c0d30e418ca4c2!2sUniversity%20of%20Saskatchewan!5e0!3m2!1sen!2sca!4v1689964820406!5m2!1sen!2sca"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: '12px', marginTop: '20px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}

export default Home;
