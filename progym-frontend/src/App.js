import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserContext } from './context/UserContext';

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
import PremiumPage from './pages/PremiumPage';
import ProgressCharts from './pages/premium/ProgressCharts';
import GymBot from './pages/premium/GymBot';
import MealPlanner from './pages/premium/MealPlanner';
import Supplements from './pages/premium/Supplements';
import Workouts from './pages/premium/Workouts';

function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isGymBotPage = location.pathname === '/premium/gymbot';

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: isGymBotPage ? 'calc(100vh - 72px)' : '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Routes>
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
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/premium/progress-charts" element={<ProgressCharts />} />
          <Route path="/premium/gymbot" element={<GymBot />} />
          <Route path="/premium/meal-planner" element={<MealPlanner />} />
          <Route path="/premium/supplements" element={<Supplements />} />
          <Route path="/premium/workouts" element={<Workouts />} />
        </Routes>
      </div>

      {!isGymBotPage && <Footer />}
    </>
  );
}

export default App;
