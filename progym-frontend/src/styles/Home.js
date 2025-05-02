// src/styles/Home.js

const homeStyles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#212529', // Dark gray for better contrast
  },

  // Hero Section
  hero: {
    textAlign: 'center',
    padding: '80px 20px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#0d6efd', // Bootstrap primary blue for emphasis
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    color: '#495057', // Medium-dark gray for readability
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
  },
  secondaryButton: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
  },

  // Features
  features: {
    marginTop: '80px',
    minHeight: '100vh', // Make feature section fill the viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px',
    color: '#0d6efd', // Emphasized section title
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Lighter background
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    color: '#212529', // Dark text
  },

  // Placeholder
  placeholderSection: {
    marginTop: '100px',
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
    color: '#6c757d', // Subtle placeholder text
  },

  // Testimonials (Future)
  testimonials: {
    marginTop: '100px',
    textAlign: 'center',
  },
  comingSoon: {
    color: '#6c757d', // Placeholder tone
    fontStyle: 'italic',
  },
};

export default homeStyles;
