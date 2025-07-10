import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
  const [formData, setFormData] = useState({
    username: '',
    height_cm: '',
    weight_kg: '',
    age: '',
    gender: 'male',
    goal: 'maintenance',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setFormData({
        username: user.username,
        height_cm: user.height_cm || '',
        weight_kg: user.weight_kg || '',
        age: user.age || '',
        gender: user.gender || 'male',
        goal: user.goal || 'maintenance',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const res = await axios.put(`http://localhost:5000/api/auth/update-profile/${user.id}`, formData);
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Edit Your Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="height_cm" type="number" value={formData.height_cm} onChange={handleChange} placeholder="Height (cm)" required />
        <input name="weight_kg" type="number" value={formData.weight_kg} onChange={handleChange} placeholder="Weight (kg)" required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="maintenance">Maintain</option>
          <option value="cutting">Lose Fat</option>
          <option value="bulking">Gain Muscle</option>
        </select>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
