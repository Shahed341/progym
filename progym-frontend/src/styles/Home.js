// src/styles/Home.js

const homeStyles = {
  container: {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    fontFamily: 'Arial, sans-serif',
  },

  // ===== HERO SECTION =====
  hero: {
    backgroundImage: "url('/images/HomeBG.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '0 20px', // left-right padding for breathing space
    textAlign: 'center',
  },

  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  },

  heroContent: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
  },

  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)', // responsive font size
    fontWeight: 'bold',
    marginBottom: '20px',
  },

  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '30px',
  },

  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '20px',
  },

  primaryButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
  },

  secondaryButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
  },

  // ===== FEATURES SECTION =====
  features: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px',
    color: '#0d6efd',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },

  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    color: '#212529',
  },

  // ===== PLACEHOLDER SECTION =====
  placeholderSection: {
    marginTop: '80px',
    padding: '0 20px',
    textAlign: 'center',
  },

  chartPlaceholder: {
    marginTop: '20px',
    height: '200px',
    border: '2px dashed rgba(33, 37, 41, 0.3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    color: '#6c757d',
  },

  // ===== TESTIMONIALS & LOCATION =====
  testimonials: {
    marginTop: '100px',
    padding: '0 20px',
    textAlign: 'center',
  },

  comingSoon: {
    color: '#6c757d',
    fontStyle: 'italic',
  },
};

export default homeStyles;
