// styles/premium/SupplementPageStyles.js

const colors = {
  pageBg: '#ece9e2',
  cardBg: '#1e1e1e',
  accent: '#f03238ff',
  white: '#FFFFFF',
};

const cardShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
const gradientOverlay = 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.65))';

const SupplementsStyles = {
  pageContainer: {
    backgroundColor: colors.pageBg,
    minHeight: '100vh',
    paddingBottom: '40px',
    fontFamily: 'Arial, sans-serif',
  },

  heroSection: {
    position: 'relative',
    height: '100vh',
    backgroundImage: "url('/images/supplements/hero-gym-realistic.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },

  heroContent: {
    zIndex: 2,
    maxWidth: '900px',
    padding: '20px',
    color: colors.white,
  },

  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: '15px',
  },

  heroSubtitle: {
    fontSize: '1.25rem',
    color: colors.white,
    maxWidth: '600px',
    margin: '0 auto 30px auto',
  },

  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
  },

  button: {
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonActive: {
    backgroundColor: colors.accent,
    color: colors.cardBg,
  },

  buttonInactive: {
    backgroundColor: colors.white,
    color: colors.cardBg,
  },

  contentGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    margin: '40px auto',
    maxWidth: '1100px',
    padding: '0 20px',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  card: {
    flex: '1 1 300px',
    background: `${gradientOverlay}, ${colors.cardBg}`,
    color: colors.white,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: cardShadow,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  imageStyle: {
    width: '100%',
    height: 'auto',
    borderRadius: '12px',
    marginBottom: '15px',
  },

  cardTitle: {
    fontSize: '1.5rem',
    color: colors.accent,
    marginBottom: '10px',
  },

  list: {
    paddingLeft: '20px',
    textAlign: 'left',
    marginTop: '10px',
  },

  rightColumn: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  usageCard: {
    maxWidth: '900px',
    margin: '0 auto',
    background: `${gradientOverlay}, ${colors.cardBg}`,
    color: colors.white,
    padding: '30px',
    borderRadius: '16px',
    marginTop: '40px',
    boxShadow: cardShadow,
  },
};

export default SupplementsStyles;
