// File: src/App.jsx

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// Shared layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// User session context
import { UserContext } from './context/UserContext';

// Public pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import TrackWorkout from './pages/TrackWorkout';
import Exercises from './pages/Exercises';
import SupplementGuide from './pages/SupplementGuide';
import BulkingStrategy from './pages/BulkingStrategy';
import CuttingStrategy from './pages/CuttingStrategy';

// Premium landing
import PremiumPage from './pages/PremiumPage';

// Premium feature pages
import ProgressCharts from './pages/premium/ProgressCharts';
import GymBot from './pages/premium/GymBot';
import MealPlanner from './pages/premium/MealPlanner';
import Supplements from './pages/premium/Supplements';
import Workouts from './pages/premium/Workouts';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header (always visible) */}
      <Navbar />

      {/* Main routing zone */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* === Public Routes === */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/track-workout" element={<TrackWorkout />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/supplement-guide" element={<SupplementGuide />} />
          <Route path="/bulking" element={<BulkingStrategy />} />
          <Route path="/cutting" element={<CuttingStrategy />} />

          {/* === Premium Home === */}
          <Route path="/premium" element={<PremiumPage />} />

          {/* === Premium Subroutes === */}
          <Route path="/premium/progress-charts" element={<ProgressCharts />} />
          <Route path="/premium/gymbot" element={<GymBot />} />
          <Route path="/premium/meal-planner" element={<MealPlanner />} />
          <Route path="/premium/supplements" element={<Supplements />} />
          <Route path="/premium/workouts" element={<Workouts />} />
        </Routes>
      </div>

      {/* Footer (always visible) */}
      <Footer />
    </div>
  );
}

export default App;
