const colors = {
  pageBackground: '#f5f2eb',
  panelBackground: '#2F2F2F',
  accentRed: '#C0392B',
  textWhite: '#FFFFFF',
};

const cardShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
const gradientDark = 'linear-gradient(145deg, #2f2f2f, #3a3a3a)';
const gradientSoft = 'linear-gradient(145deg, #3e3e3e, #4a4a4a)';
const gradientCardOverlay = 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.65))';

const styles = {
  pageContainer: {
    backgroundColor: colors.pageBackground,
    minHeight: '100vh',
    paddingBottom: '40px',
    fontFamily: 'Arial, sans-serif',
  },

  heroSection: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  heroBackground: {
    backgroundImage: "url('/images/supplements/hero-gym-realistic.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    filter: 'brightness(0.5)',
    backdropFilter: 'blur(4px)',
  },

  heroOverlay: {
    position: 'relative',
    zIndex: 1,
    color: colors.textWhite,
    textAlign: 'center',
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },

  heroSubtitle: {
    fontSize: '1.25rem',
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
    backgroundColor: colors.accentRed,
    color: colors.textWhite,
  },

  buttonInactive: {
    backgroundColor: colors.textWhite,
    color: colors.panelBackground,
  },

  buttonHover: {
    transform: 'scale(1.1)',
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

  featuredCard: {
    flex: '1 1 300px',
    background: `${gradientCardOverlay}, ${gradientDark}`,
    color: colors.textWhite,
    borderRadius: '16px',
    padding: '20px',
    textAlign: 'center',
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
    marginBottom: '10px',
  },

  rightColumn: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
  },

  benefitsCard: {
    flex: 1,
    background: `${gradientCardOverlay}, ${gradientSoft}`,
    color: colors.textWhite,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: cardShadow,
  },

  sideEffectsCard: {
    flex: 1,
    background: `${gradientCardOverlay}, ${gradientSoft}`,
    color: colors.textWhite,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: cardShadow,
  },

  list: {
    paddingLeft: '20px',
    marginTop: '10px',
    textAlign: 'left',
  },

  usageCard: {
    maxWidth: '900px',
    margin: '0 auto',
    background: `${gradientCardOverlay}, ${gradientDark}`,
    color: colors.textWhite,
    padding: '30px',
    borderRadius: '16px',
    marginTop: '40px',
    boxShadow: cardShadow,
  },
};

export default styles;
