// File: progym-frontend/src/styles/TrackWorkout.js

const trackWorkoutStyles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#ffffff', // full white background
    color: '#1f2937', // dark gray text
    minHeight: '100vh',
    boxSizing: 'border-box',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #facc15, #fcd34d)', // yellow gradient
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  selector: {
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'center',
  },

  dropdown: {
    border: '1px solid #d1d5db',
    backgroundColor: '#f3f4f6', // light gray background
    color: '#1f2937', // dark gray text
    padding: '0.5rem',
    borderRadius: '0.375rem',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },

  exerciseCard: (isSelected) => ({
    padding: '1rem',
    border: `2px solid ${isSelected ? '#facc15' : '#9ca3af'}`, // yellow or gray border
    borderRadius: '0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#fef9c3' : '#e5e7eb', // soft yellow or gray
    color: isSelected ? '#78350f' : '#1f2937',
    transition: 'all 0.3s ease-in-out',
    fontWeight: 'bold',
  }),

  inputPanel: {
    padding: '1.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    backgroundColor: '#f9fafb', // soft gray
    marginBottom: '2rem',
  },

  inputGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },

  input: {
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    width: '100%',
  },

  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: '#facc15',
    color: '#1f2937',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonHover: {
    backgroundColor: '#eab308',
    transform: 'scale(1.03)',
    boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)',
  },

  subTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#facc15',
    marginBottom: '0.75rem',
    textAlign: 'left',
  },

  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '3rem',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #facc15, #fcd34d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
};

export default trackWorkoutStyles;
