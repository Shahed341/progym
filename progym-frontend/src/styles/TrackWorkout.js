// File: progym-frontend/src/styles/TrackWorkout.js

const trackWorkoutStyles = {
  container: {
    padding: '1.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#111827',
    color: '#f3f4f6',
    minHeight: '100vh',
  },
  title: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#facc15',
    textAlign: 'center',
  },
  selector: {
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  dropdown: {
    border: '1px solid #374151',
    backgroundColor: '#1f2937',
    color: '#f3f4f6',
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
    border: `2px solid ${isSelected ? '#facc15' : '#374151'}`,
    borderRadius: '0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#facc15' : '#1f2937',
    color: isSelected ? '#1f2937' : '#f3f4f6',
    transition: 'all 0.2s ease-in-out',
    fontWeight: 'bold',
  }),
  inputPanel: {
    padding: '1.5rem',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    backgroundColor: '#1f2937',
    marginBottom: '2rem',
  },
  inputGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#f3f4f6',
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
    transition: 'background-color 0.3s ease',
  },
};

export default trackWorkoutStyles;
