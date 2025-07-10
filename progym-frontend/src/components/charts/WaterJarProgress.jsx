// src/components/charts/WaterJarProgress.jsx
import React from 'react';

function WaterJarProgress({ value, goal }) {
  const percent = Math.min((value / goal) * 100, 100);
  return (
    <div style={{ height: '150px', width: '80px', border: '3px solid #dc2626', borderRadius: '0 0 40px 40px', overflow: 'hidden', position: 'relative', background: '#fff' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: `${percent}%`,
          background: 'rgba(220, 38, 38, 0.6)',
          transition: 'height 0.3s ease-in-out'
        }}
      />
      <div style={{ position: 'absolute', width: '100%', textAlign: 'center', top: '50%', fontSize: '12px', fontWeight: 'bold' }}>{value} / {goal} ml</div>
    </div>
  );
}

export default WaterJarProgress;