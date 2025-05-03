// src/styles/PremiumPageStyle.js

const premiumStyles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },

  // Inside premiumStyles

hero: {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  marginBottom: '40px',
},

heroTitle: {
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#0d6efd',
  marginBottom: '10px',
},

heroSubtitle: {
  fontSize: '18px',
  color: '#495057',
},


  sectionTitle: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#0d6efd',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },

  featureCardLink: {
    textDecoration: 'none',
  },

  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    color: '#212529',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};

export default premiumStyles;
