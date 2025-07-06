const trackWorkoutStyles = {
  container: {
    padding: '2rem 1.5rem',       // ✅ Space on left/right while full width
    width: '100%',
    margin: 0,
    backgroundColor: '#ffffff',
    color: '#1A3636',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #D6BD98, #fcd34d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  fixedCategoryHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: '#ffffff',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },

  gridBodyParts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  bodyCard: (isSelected) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    transition: 'transform 0.3s ease',
    border: `2px solid ${isSelected ? '#D6BD98' : '#677D6A'}`,
    borderRadius: '1rem',
    backgroundColor: isSelected ? '#fef3c7' : '#f3f4f6',
    color: isSelected ? '#1A3636' : '#40534C',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  }),

  bodyImage: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    transition: 'transform 0.3s ease',
    marginBottom: '0.5rem',
  },

  bodyLabel: {
    fontWeight: '600',
    marginTop: '0.25rem',
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
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    padding: '0.5rem',
    borderRadius: '0.375rem',
  },

  gridExercises: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },

  exerciseCard: (isSelected) => ({
    padding: '1rem',
    border: `2px solid ${isSelected ? '#D6BD98' : '#9ca3af'}`,
    borderRadius: '0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#f5f5dc' : '#e5e7eb',
    color: isSelected ? '#1A3636' : '#40534C',
    fontWeight: 'bold',
    transition: 'all 0.3s ease-in-out',
  }),

  inputPanel: {
    padding: '1.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.75rem',
    backgroundColor: '#f9fafb',
    marginBottom: '2rem',
  },

  inputGroupPremium: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },

  inputPremium: {
    border: '1px solid #D6BD98',
    backgroundColor: '#ffffff',
    color: '#1A3636',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    boxShadow: '0 1px 4px rgba(103, 125, 106, 0.2)',
    transition: '0.3s ease',
  },

  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: '#D6BD98',
    color: '#1A3636',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonHover: {
    backgroundColor: '#caa97c',
    transform: 'scale(1.03)',
    boxShadow: '0 4px 12px rgba(214, 189, 152, 0.4)',
  },

  subTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1A3636',
    marginBottom: '0.75rem',
    textAlign: 'left',
  },

  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '3rem',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #D6BD98, #fcd34d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
};

export default trackWorkoutStyles;
