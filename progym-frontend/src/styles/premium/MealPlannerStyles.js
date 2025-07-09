const styles = {
  container: {
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
  },

  heading: {
    fontSize: '2.5rem',
    color: '#1A3636',
    marginBottom: '10px',
  },

  subtext: {
    fontSize: '1.2rem',
    color: '#40534C',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
    lineHeight: '1.5',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    paddingBottom: '30px',
  },

  label: {
    fontSize: '1rem',
    textAlign: 'left',
    color: '#1f2937',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },

  button: {
    padding: '12px 24px',
    backgroundColor: '#1A3636',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonHover: {
    backgroundColor: '#677D6A',
  },

  results: {
    marginTop: '50px',
    textAlign: 'left',
  },

  resultsHeading: {
    fontSize: '1.8rem',
    color: '#1A3636',
    marginBottom: '20px',
    textAlign: 'center',
  },

  mealCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },

  mealTitle: {
    fontSize: '1.3rem',
    color: '#40534C',
    marginBottom: '10px',
  },

  mealList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '#1f2937',
    lineHeight: '1.6',
  },
};

export default styles;
