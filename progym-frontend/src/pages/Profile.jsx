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
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handlePhotoUpload = () => {
    // Placeholder for image upload functionality
    alert('Upload photo feature coming soon!');
  };

  const handleEditProfile = () => {
    alert('Redirect to profile edit page');
    // navigate('/edit-profile');
  };

  const handleDeactivatePremium = () => {
    alert('Premium deactivation requested.');
    // Add backend call here
  };

  if (!user) {
    return (
      <div style={profileStyles.centerBox}>
        <h2 style={profileStyles.message}>Please log in to view your profile</h2>
        <div style={profileStyles.buttonRow}>
          <Link to="/login" style={profileStyles.authButton}>Login</Link>
          <Link to="/register" style={profileStyles.authButton}>Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={profileStyles.pageWrapper}>
      <div style={profileStyles.profileCard}>
        <img src="/images/user-avatar.png" alt="User Avatar" style={profileStyles.avatar} />
        <h2 style={profileStyles.username}>{user.username}</h2>
        <p style={profileStyles.email}>{user.email}</p>
        <p><strong>Member Since:</strong> Jan 2024</p>
        <p><strong>Membership:</strong> <span style={profileStyles.premiumTag}>Pro Plus</span></p>

        <div style={profileStyles.buttonGroup}>
          <button style={profileStyles.editButton} onClick={handlePhotoUpload}>📸 Upload Photo</button>
          <button style={profileStyles.editButton} onClick={handleEditProfile}>✏️ Edit Info</button>
          <button style={profileStyles.editButton} onClick={handleDeactivatePremium}>❌ Deactivate Premium</button>
          <button style={profileStyles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>

        <div style={profileStyles.premiumPanel}>
          <Link to="/premium-dashboard" style={profileStyles.premiumButton}>📊 Dashboard</Link>
          <Link to="/gymbot" style={profileStyles.premiumButton}>🤖 GymBot</Link>
          <Link to="/exclusive-plans" style={profileStyles.premiumButton}>🔥 Plans</Link>
          <Link to="/settings" style={profileStyles.premiumButton}>⚙️ Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
