// src/styles/Home.js

const homeStyles = {
  container: {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)', // matt black gradient
    color: '#f3f4f6'
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
    padding: '0 20px',
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
    color: '#f3f4f6',
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
  },

  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#facc15'
  },

  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '30px',
    color: '#d1d5db'
  },

  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '20px',
  },

  primaryButton: {
    backgroundColor: '#facc15',
    color: '#1f2937',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold'
  },

  secondaryButton: {
    backgroundColor: '#1f2937',
    color: '#facc15',
    padding: '12px 24px',
    border: '1px solid #facc15',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold'
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
    color: '#facc15'
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },

  featureCard: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    color: '#f3f4f6',
    transition: 'transform 0.3s ease',
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
    border: '2px dashed #facc15',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    color: '#facc15',
  },

  // ===== TESTIMONIALS & LOCATION =====
  testimonials: {
    marginTop: '100px',
    padding: '0 20px',
    textAlign: 'center',
  },

  comingSoon: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
};

export default homeStyles;
