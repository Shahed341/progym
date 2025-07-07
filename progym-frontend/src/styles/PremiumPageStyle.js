// src/styles/PremiumPageStyle.js

const premiumStyles = {
  fullPage: {
    backgroundColor: '#F5F2EB', // cream white
    minHeight: '100vh',
    padding: '60px 20px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },

  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
  },

  hero: {
    textAlign: 'center',
    marginBottom: '60px',
  },

  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: '16px',
  },

  heroSubtitle: {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    color: '#555555',
  },

  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    paddingTop: '20px',
  },

  cardLink: {
    textDecoration: 'none',
  },

  featureCard: {
    backgroundColor: '#1E1E1E', // soft black
    borderRadius: '16px',
    padding: '30px 20px',
    color: '#F5F5F5',
    boxShadow: '0 8px 20px rgba(255, 60, 56, 0.2)', // red glow
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '360px',
  },

  featureCardHover: {
    transform: 'translateY(-6px) scale(1.05)',
    boxShadow: '0 16px 32px rgba(255, 60, 56, 0.4)', // intense red glow on hover
  },

  cardImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '20px',
  },

  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FF3C38', // premium red
    marginBottom: '10px',
  },

  cardText: {
    fontSize: '15px',
    color: '#CCCCCC',
    lineHeight: '1.6',
  },
};

export default premiumStyles;
