// src/pages/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import registerStyles from '../styles/Register';
import { UserContext } from '../context/UserContext'; // Context to manage user state

function Register() {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form data:", formData); // Debug: View values being sent

    try {
      // Step 1: Register the user
      await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Step 2: Log in the user automatically
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const loggedInUser = loginRes.data.user;

      // Step 3: Save user to localStorage and context
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      // Step 4: Redirect to home
      navigate('/');
    } catch (err) {
      console.error('Registration/Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration or login failed!');
    }
  };

  return (
    <div style={registerStyles.background}>
      <div style={registerStyles.formContainer}>
        <h2>Create your ProGYM Account</h2>
        <form onSubmit={handleSubmit} style={registerStyles.form}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <button type="submit" style={registerStyles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
