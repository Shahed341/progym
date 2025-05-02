
// src/pages/AdminDashboard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  // Only allow access if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <p>Here you can manage users, plans, and system settings.</p>
    </div>
  );
}

export default AdminDashboard;
