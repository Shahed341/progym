import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileStyles from '../styles/ProfileStyles';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear saved user session
    setUser(null);                   // Optional: update UI immediately
    navigate('/login');             // Redirect to login
  };

  if (!user) {
    return (
      <div style={profileStyles.centerBox}>
        <h2>Please log in to view your profile</h2>
        <div style={profileStyles.buttonRow}>
          <Link to="/login" style={profileStyles.authButton}>Login</Link>
          <Link to="/register" style={profileStyles.authButton}>Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={profileStyles.container}>
      <h1 style={profileStyles.title}>Welcome, {user.username}!</h1>
      <div style={profileStyles.infoBox}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member since:</strong> Jan 2024</p>
        <p><strong>Membership Type:</strong> Pro Plus</p>
        <button style={profileStyles.editButton}>Edit Profile</button>
        <button onClick={handleLogout} style={profileStyles.logoutButton}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
