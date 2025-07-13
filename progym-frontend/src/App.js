import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { UserContext } from './context/UserContext';

// General Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Upgrade from './pages/Upgrade';

// General Tools
import TrackWorkout from './pages/TrackWorkout';
import Exercises from './pages/Exercises';
import SupplementGuide from './pages/SupplementGuide';
import BulkingStrategy from './pages/BulkingStrategy';
import CuttingStrategy from './pages/CuttingStrategy';
import CalorieTracker from './pages/CalorieTracker';

// Premium Tools
import PremiumDashboard from './pages/premium/PremiumDashboard';
import ProgressCharts from './pages/premium/ProgressCharts';
import GymBot from './pages/premium/GymBot';
import MealPlanner from './pages/premium/MealPlanner';
import Supplements from './pages/premium/Supplements';
import PremiumWorkouts from './pages/premium/PremiumWorkouts';

function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isGymBotPage = location.pathname === '/premium/gymbot';

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div
        style={{
          minHeight: isGymBotPage ? 'calc(100vh - 72px)' : '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/upgrade" element={<Upgrade />} />

          {/* General Tools */}
          <Route path="/track-workout" element={<TrackWorkout />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/supplement-guide" element={<SupplementGuide />} />
          <Route path="/bulking" element={<BulkingStrategy />} />
          <Route path="/cutting" element={<CuttingStrategy />} />
          <Route path="/calorie-tracker" element={<CalorieTracker />} />

          {/* Premium Tools */}
          <Route path="/premium" element={<PremiumDashboard />} />
          <Route path="/premium/progress-charts" element={<ProgressCharts />} />
          <Route path="/premium/gymbot" element={<GymBot />} />
          <Route path="/premium/meal-planner" element={<MealPlanner />} />
          <Route path="/premium/supplements" element={<Supplements />} />
          <Route path="/premium/workouts" element={<PremiumWorkouts />} />
        </Routes>
      </div>

      {!isGymBotPage && <Footer />}
    </>
  );
}

export default App;
