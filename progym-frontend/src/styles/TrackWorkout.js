// File: progym-frontend/src/styles/TrackWorkout.js

const trackWorkoutStyles = {
    container: {
      padding: '1.5rem',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    selector: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    dropdown: {
      border: '1px solid #ccc',
      padding: '0.5rem',
      borderRadius: '0.375rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    exerciseCard: (isSelected) => ({
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '0.5rem',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: isSelected ? '#DBEAFE' : 'white',
      transition: 'background-color 0.2s ease',
    }),
    inputPanel: {
      padding: '1rem',
      border: '1px solid #ccc',
      borderRadius: '0.5rem',
      backgroundColor: '#F9FAFB',
      marginBottom: '2rem',
    },
    inputGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '1rem',
    },
    input: {
      border: '1px solid #ccc',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      width: '100%',
    },
    button: {
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#2563EB',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
    },
  };
  
  export default trackWorkoutStyles;
  