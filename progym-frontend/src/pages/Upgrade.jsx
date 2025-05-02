import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Upgrade() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle upgrade click
  const handleUpgrade = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/upgrade', {
        userId: user.id,
      });

      alert('You are now a Premium member!');
      
      // Update user role in context and localStorage
      const updatedUser = { ...user, role: 'premium' };
      setUser(updatedUser); // Context will handle localStorage sync

      // Optionally redirect
      navigate('/premium');
    } catch (err) {
      console.error('Upgrade failed:', err);
      alert('Failed to upgrade to premium.');
    }
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h1>Upgrade to Premium</h1>
      <p style={{ fontSize: '18px', maxWidth: '600px', margin: '20px auto' }}>
        Unlock access to personalized meal plans, workout analytics, progress charts, and our AI GymBot.
      </p>
      <button
        onClick={handleUpgrade}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#ffc107',
          color: '#212529',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '30px'
        }}
      >
        Upgrade Now
      </button>
    </div>
  );
}

export default Upgrade;
