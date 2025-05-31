// File: src/App.jsx

import React, { useContext } from 'react'; // React core + context API
import { Routes, Route } from 'react-router-dom'; // For page routing/navigation

// Shared UI components
import Navbar from './components/Navbar'; // Top navigation bar
import Footer from './components/Footer'; // Bottom footer

// User context to access logged-in user info
import { UserContext } from './context/UserContext'; // Holds session-based user data

// Public pages
import Home from './pages/Home';             // Landing page
import Register from './pages/Register';     // Registration form (connects to /api/auth/register)
import Login from './pages/Login';           // Login form (connects to /api/auth/login)
import Profile from './pages/Profile';       // Shows user info (uses GET /api/user or session)
import Upgrade from './pages/Upgrade';       // Upgrades role via /api/auth/upgrade
import PremiumPage from './pages/PremiumPage'; // Landing page for premium users
import TrackWorkout from './pages/TrackWorkout'; // Workout tracker (connects to /api/workouts)

// Premium feature pages (stored inside src/pages/premium/)
import ProgressCharts from './pages/premium/ProgressCharts'; // Shows chart from /api/workouts
import GymBot from './pages/premium/GymBot';                 // Chat interface (calls /api/gymbot)
import MealPlanner from './pages/premium/MealPlanner';       // Pulls plans from /api/plan/meal
import Supplements from './pages/premium/Supplements';       // Static or fetched data
import Workouts from './pages/premium/Workouts';             // Workout plans from /api/plan/workout

function App() {
  // Extract logged-in user info from context provider
  const { user } = useContext(UserContext); // This can be used to control access or pass user props

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar remains visible on all pages */}
      <Navbar />

      {/* Main route area where page components load */}
      <div style={{ flex: 1 }}>
        <Routes>

          {/* Public routes (no login required) */}
          <Route path="/" element={<Home user={user} />} /> {/* Passes user as prop */}
          <Route path="/register" element={<Register />} /> {/* Sends POST to /api/auth/register */}
          <Route path="/login" element={<Login />} />       {/* Sends POST to /api/auth/login */}
          <Route path="/profile" element={<Profile />} />   {/* Fetches from backend using user.id */}
          <Route path="/upgrade" element={<Upgrade />} />   {/* Sends POST to /api/auth/upgrade */}
          <Route path="/track-workout" element={<TrackWorkout />} /> {/* Sends POST/GET/DELETE to /api/workouts */}

          {/* Premium features entry point */}
          <Route path="/premium" element={<PremiumPage />} />

          {/* Premium-only pages (assume frontend checks user.role === 'premium') */}
          <Route path="/premium/progress-charts" element={<ProgressCharts />} /> {/* Calls /api/workouts for chart data */}
          <Route path="/premium/gymbot" element={<GymBot />} />                 {/* Sends message to /api/gymbot */}
          <Route path="/premium/meal-planner" element={<MealPlanner />} />     {/* Fetches meal plan from backend */}
          <Route path="/premium/supplements" element={<Supplements />} />       {/* Static or fetched from /api/supplements */}
          <Route path="/premium/workouts" element={<Workouts />} />             {/* Fetched from /api/plan/workout */}

        </Routes>
      </div>

      {/* Footer remains visible on all pages */}
      <Footer />
    </div>
  );
}

export default App;
