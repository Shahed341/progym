const homeStyles = {
  container: {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9fafb',
    color: '#1f2937',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },

  heroContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    width: '100%',
    padding: '20px',
  },

  heroTitle: {
    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#facc15',
  },

  heroSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '30px',
    color: '#ffffff',
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
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },

  secondaryButton: {
    backgroundColor: '#1f2937',
    color: '#facc15',
    padding: '12px 24px',
    border: '1px solid #facc15',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },

  primaryButtonHover: {
    backgroundColor: '#eab308',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)',
  },

  secondaryButtonHover: {
    backgroundColor: '#111827',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(250, 204, 21, 0.2)',
  },

  // ===== FEATURE SECTION =====
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
    color: '#facc15',
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },

  featureCard: {
    background: 'linear-gradient(145deg, #d1d5db, #e5e7eb)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    color: '#1f2937',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    minHeight: '300px',
  },

  featureCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
  },

  premiumFeatureCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(216, 0, 0, 0.5)',
  },

  featureIcon: {
    width: '80px',
    height: '80px',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
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

  // ===== TESTIMONIALS & SUCCESS STORIES =====
  testimonials: {
    marginTop: '100px',
    padding: '0 20px',
    textAlign: 'center',
  },

  comingSoon: {
    color: '#6b7280',
    fontStyle: 'italic',
  },

  successStoriesSection: {
    padding: '80px 20px',
    position: 'relative',
    minHeight: '400px',
  },

  storyGridScrollContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '20px',
    overflowX: 'hidden',
    padding: '20px 60px',
    scrollBehavior: 'smooth',
    alignItems: 'center',
  },

  storyCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    width: '320px',
    minWidth: '320px',
    height: '320px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  storyImages: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
  },

  storyImage: {
    width: '50%',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  },

  storyComment: {
    fontStyle: 'italic',
    color: '#1f2937',
    marginTop: '10px',
  },

  storyNavButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#facc15',
    color: '#1f2937',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    zIndex: 2,
  },

  storyNavLeft: {
    left: '10px',
  },

  storyNavRight: {
    right: '10px',
  },
};

export default homeStyles;
