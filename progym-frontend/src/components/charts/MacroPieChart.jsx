// src/components/charts/MacroPieChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function MacroPieChart({ macros }) {
  const data = [
    { name: 'Protein', value: macros.protein },
    { name: 'Carbs', value: macros.carbs },
    { name: 'Fat', value: macros.fat },
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  return (
    <PieChart width={180} height={180}>
      <Pie
        data={data}
        cx={90}
        cy={90}
        labelLine={false}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default MacroPieChart;