// Path: progym-frontend/src/styles/TrackWorkout.js

const colors = {
  pageBg: '#fcf9f1ff',     // light beige for page background
  cardBg: '#1e1e1e',     // dark panels, titles, and sidebar
  accent: '#f03238ff',   // bold red accent
  white: '#FFFFFF',      // text on dark bg
};

const trackWorkout = {
  container: {
    padding: '2rem 1.5rem',
    width: '100%',
    margin: 0,
    backgroundColor: colors.pageBg,
    color: colors.cardBg,
    minHeight: '100vh',
    boxSizing: 'border-box',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: colors.accent,
  },

  fixedCategoryHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    backgroundColor: colors.pageBg,
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
    border: `2px solid ${isSelected ? colors.accent : '#677D6A'}`,
    borderRadius: '1rem',
    backgroundColor: isSelected ? '#ffecec' : '#f7f7f7',
    color: isSelected ? colors.cardBg : '#40534C',
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
    border: `1px solid ${colors.accent}`,
    backgroundColor: '#ffffff',
    color: colors.cardBg,
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
    border: `2px solid ${isSelected ? colors.accent : '#b0b0b0'}`,
    borderRadius: '0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: isSelected ? '#fef0f0' : '#ececec',
    color: isSelected ? colors.cardBg : '#555',
    fontWeight: 'bold',
    transition: 'all 0.3s ease-in-out',
  }),

  inputPanel: {
    padding: '1.5rem',
    border: `1px solid ${colors.accent}`,
    borderRadius: '0.75rem',
    backgroundColor: '#f9f9f9',
    marginBottom: '2rem',
  },

  inputGroupPremium: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },

  inputPremium: {
    border: `1px solid ${colors.accent}`,
    backgroundColor: colors.white,
    color: colors.cardBg,
    padding: '0.75rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    boxShadow: '0 1px 4px rgba(240, 50, 56, 0.1)',
    transition: '0.3s ease',
  },

  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: colors.accent,
    color: colors.white,
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonHover: {
    backgroundColor: '#c92c31',
    transform: 'scale(1.03)',
    boxShadow: '0 4px 12px rgba(240, 50, 56, 0.3)',
  },

  subTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: colors.cardBg,
    marginBottom: '0.75rem',
    textAlign: 'left',
  },

  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '3rem',
    marginBottom: '1rem',
    color: colors.accent,
    textAlign: 'center',
  },
};

export default trackWorkout;
