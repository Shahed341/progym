import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import registerStyles from '../styles/Register';
import { UserContext } from '../context/UserContext';

function Register() {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    height_cm: '',
    weight_kg: '',
    age: '',
    gender: 'male',
    goal: 'maintenance'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form data:", formData);

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      const loggedInUser = loginRes.data.user;

      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);

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
          <input
            type="number"
            name="height_cm"
            placeholder="Height (cm)"
            required
            value={formData.height_cm}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <input
            type="number"
            name="weight_kg"
            placeholder="Weight (kg)"
            required
            value={formData.weight_kg}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            required
            value={formData.age}
            onChange={handleChange}
            style={registerStyles.input}
          />
          <select
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
            style={registerStyles.input}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="goal"
            required
            value={formData.goal}
            onChange={handleChange}
            style={registerStyles.input}
          >
            <option value="maintenance">Maintain</option>
            <option value="cutting">Lose Fat</option>
            <option value="bulking">Gain Muscle</option>
          </select>

          <button type="submit" style={registerStyles.button}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
