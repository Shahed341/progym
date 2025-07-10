// src/styles/premium/ProgressChartsStyles.js

const ProgressChartsStyles = {
  container: {
    padding: '40px',
    backgroundColor: '#1f1f1f', // Soft Black background
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    color: '#ffffff', // Premium White text
  },

  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ff3c38', // Premium Red title
    marginBottom: '30px',
    textAlign: 'center',
  },

  section: {
    marginBottom: '60px',
  },

  sectionTitle: {
    fontSize: '24px',
    color: '#ffffff',
    marginBottom: '20px',
    borderBottom: '2px solid #ff3c38',
    paddingBottom: '6px',
  },

  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },

  chartBox: {
    flex: '1 1 30%',
    background: '#ffffff', // Premium White cards
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(255, 60, 56, 0.15)',
    minHeight: '200px',
    color: '#1f1f1f', // Black text inside white cards
  },

  chartBoxWide: {
    flex: '1 1 100%',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(255, 60, 56, 0.15)',
    minHeight: '300px',
    color: '#1f1f1f',
  },

  barPlaceholder: {
    height: '40px',
    backgroundColor: '#ff3c38',
    borderRadius: '8px',
    textAlign: 'center',
    lineHeight: '40px',
    color: '#ffffff',
    fontWeight: 'bold',
  },

  jarPlaceholder: {
    height: '200px',
    background: 'linear-gradient(to top, #ff3c38 60%, transparent 60%)',
    borderRadius: '20px 20px 0 0',
    border: '2px solid #ff3c38',
    textAlign: 'center',
    lineHeight: '200px',
    fontWeight: 'bold',
    color: '#1f1f1f',
  },

  piePlaceholder: {
    width: '100%',
    height: '200px',
    backgroundColor: '#ff3c38',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '200px',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  linePlaceholder: {
    height: '200px',
    backgroundColor: '#ff3c38',
    borderRadius: '8px',
    textAlign: 'center',
    lineHeight: '200px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
};

export default ProgressChartsStyles;
