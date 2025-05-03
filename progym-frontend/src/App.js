import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

// Shared UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { UserContext } from './context/UserContext';

// Public pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import PremiumPage from './pages/PremiumPage';

// Premium feature pages (ensure the folder is lowercase: 'premium')
import ProgressCharts from './pages/premium/ProgressCharts';
import GymBot from './pages/premium/GymBot';
import MealPlanner from './pages/premium/MealPlanner';
import Supplements from './pages/premium/Supplements';
import Workouts from './pages/premium/Workouts';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar />

      {/* Page Routes */}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />

          {/* Premium landing */}
          <Route path="/premium" element={<PremiumPage />} />

          {/* Premium features */}
          <Route path="/premium/progress-charts" element={<ProgressCharts />} />
          <Route path="/premium/gymbot" element={<GymBot />} />
          <Route path="/premium/meal-planner" element={<MealPlanner />} />
          <Route path="/premium/supplements" element={<Supplements />} />
          <Route path="/premium/workouts" element={<Workouts />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
