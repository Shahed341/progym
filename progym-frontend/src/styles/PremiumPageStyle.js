// src/styles/PremiumPageStyle.js

const premiumStyles = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  hero: {
    textAlign: 'center',
    padding: '60px 20px 30px',
    backgroundColor: '#101820',
    color: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '30px',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  featureButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '16px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    textAlign: 'center',
    display: 'block',
  },
};

export default premiumStyles;
