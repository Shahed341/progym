// src/components/charts/LineWorkoutTrend.jsx
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function LineWorkoutTrend({ data }) {
  return (
    <LineChart width={450} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="weight" stroke="#ef4444" name="Weight (kg)" />
      <Line type="monotone" dataKey="sets" stroke="#3b82f6" name="Sets" />
      <Line type="monotone" dataKey="reps" stroke="#10b981" name="Reps" />
    </LineChart>
  );
}

export default LineWorkoutTrend;