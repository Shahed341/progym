import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserContext } from './context/UserContext';

// Public and authenticated pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import PremiumPage from './pages/PremiumPage';

// Premium feature components (inside Premium folder)
import ProgressCharts from './pages/Premium/progress-charts';
import GymBot from './pages/Premium/gymbot';
import MealPlanner from './pages/Premium/meal-planner';
import Supplements from './pages/Premium/supplements';
import Workouts from './pages/Premium/workouts';

function App() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/premium" element={<PremiumPage />} />

          {/* Premium feature routes */}
          <Route path="/premium/progress-charts" element={<ProgressCharts />} />
          <Route path="/premium/gymbot" element={<GymBot />} />
          <Route path="/premium/meal-planner" element={<MealPlanner />} />
          <Route path="/premium/supplements" element={<Supplements />} />
          <Route path="/premium/workouts" element={<Workouts />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
