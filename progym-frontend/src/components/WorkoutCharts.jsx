// File: progym-frontend/src/components/WorkoutCharts.jsx

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import styles from '../styles/WorkoutCharts';

const COLORS = ['#1A3636', '#40534C', '#677D6A', '#D6BD98', '#a0aec0'];

const WorkoutCharts = ({ data, radarData, pieData, scatterData }) => {
  return (
    <div style={styles.section}>
      {/* Line Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Weight Over Time</h3>
        <p style={{ textAlign: 'center' }}>This graph shows the weight lifted for the selected exercise across different dates.</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="weight" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#60a5fa" name="Weight" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Volume Per Day</h3>
        <p style={{ textAlign: 'center' }}>Shows total workout volume (sets × reps × weight) logged per day.</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volume" fill="#1A3636" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Cumulative Volume</h3>
        <p style={{ textAlign: 'center' }}>Visualizes the trend of total workout load over time using a smooth area graph.</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#677D6A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#677D6A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="volume" stroke="#677D6A" fillOpacity={1} fill="url(#colorVolume)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Muscle Group Focus</h3>
        <p style={{ textAlign: 'center' }}>Compare workout volume distribution across major muscle groups.</p>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="group" />
            <PolarRadiusAxis />
            <Radar name="Focus" dataKey="volume" stroke="#D6BD98" fill="#D6BD98" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Workout Distribution</h3>
        <p style={{ textAlign: 'center' }}>This pie chart breaks down the percentage of total volume spent on each category.</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#40534C" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Scatter Plot */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>Weight vs Reps</h3>
        <p style={{ textAlign: 'center' }}>Helps understand how weight lifted varies with number of repetitions.</p>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="weight" name="Weight" />
            <YAxis type="number" dataKey="reps" name="Reps" />
            <ZAxis range={[60]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Sessions" data={scatterData} fill="#60a5fa" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutCharts;
