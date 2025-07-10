
// src/components/charts/LineCalorieHistory.jsx
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function LineCalorieHistory({ data }) {
  return (
    <LineChart width={280} height={200} data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="calories" stroke="#dc2626" />
    </LineChart>
  );
}

export default LineCalorieHistory;