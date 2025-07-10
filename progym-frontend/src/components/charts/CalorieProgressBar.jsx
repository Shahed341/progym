// src/components/charts/CalorieProgressBar.jsx
import React from 'react';

function CalorieProgressBar({ percent, consumed, goal }) {
  return (
    <div style={{ background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${percent}%`,
          background: '#dc2626',
          padding: '10px',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {consumed} / {goal} kcal
      </div>
    </div>
  );
}

export default CalorieProgressBar;
