// src/pages/Login.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginStyles from '../styles/Login';
import { UserContext } from '../context/UserContext';

function Login() {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      alert('Login successful!');
      setUser(res.data.user);
      navigate('/'); // Redirect to home
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };

  // Render form
  return (
    <div style={loginStyles.background}>
      <div style={loginStyles.formContainer}>
        <h2>Welcome Back to ProGYM</h2>
        <form onSubmit={handleSubmit} style={loginStyles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            style={loginStyles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            style={loginStyles.input}
          />
          <button type="submit" style={loginStyles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
