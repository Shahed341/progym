// src/styles/PremiumPageStyle.js

const premiumStyles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#111827',
    color: '#f3f4f6',
  },

  hero: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    marginBottom: '40px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },

  heroTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#facc15',
    marginBottom: '10px',
  },

  heroSubtitle: {
    fontSize: '18px',
    color: '#d1d5db',
  },

  sectionTitle: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#facc15',
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
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    color: '#f3f4f6',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};

export default premiumStyles;
