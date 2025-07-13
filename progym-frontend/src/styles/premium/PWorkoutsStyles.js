// styles/premium/PWorkoutsStyles.js

const colors = {
  pageBg: '#ece9e2',    // background for the entire premium page
  cardBg: '#1e1e1e',    // background for cards and sidebar
  accent: '#f03238ff',  // for big text highlights
  white: '#FFFFFF',
};

export const heroSection = {
  position: 'relative',
  backgroundImage: "url('/images/premiumWorkouts/PremiumWorkoutsBG.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  color: colors.accent,
};

export const heroOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1,
};

export const heroContent = {
  zIndex: 2,
  maxWidth: '800px',
  padding: '20px',
};

export const heroTitle = {
  fontSize: '48px',
  color: colors.accent,
};

export const heroSubtitle = {
  fontSize: '20px',
  margin: '20px 0',
  color: colors.white,
};

export const categoryButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginTop: '20px',
};

export const categoryButton = (isActive) => ({
  background: isActive ? colors.accent : colors.cardBg,
  color: isActive ? colors.cardBg : colors.white,
  padding: '10px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'transform 0.2s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export const sectionContainer = {
  padding: '40px',
  background: colors.pageBg,
  color: colors.white,
  overflowX: 'hidden',
};

export const workoutArea = {
  display: 'flex',
  gap: '40px',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

// Left sidebar: restrict width, auto-height
export const sidebarCard = {
  background: colors.cardBg,
  padding: '20px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease',
  maxWidth: '200px',    // limit sidebar width
  flexShrink: 0,        // do not shrink
};

export const sidebarButton = (isActive) => ({
  background: isActive ? colors.accent : colors.cardBg,
  color: isActive ? colors.cardBg : colors.white,
  padding: '12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  width: '100%',
  fontSize: '15px',
  transition: 'transform 0.2s ease',
});

export const mergedCardColumn = {
  flex: 1,
  minWidth: '300px',
};

export const workoutCard = {
  background: colors.cardBg,
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease',
};

export const workoutImage = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
};

export const workoutTitle = {
  marginTop: '15px',
  color: colors.accent,
  fontSize: '24px',   // larger exercise title
};

export const mergedCard = (isMobile) => ({
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  background: colors.cardBg,
  padding: '20px',
  borderRadius: '10px',
  alignItems: 'center',
  width: '100%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease',
});

export const mergedImage = {
  width: '500px',      // larger GIF
  height: '500px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginRight: '20px',
  marginBottom: '20px',
};

export const mergedDetails = {
  flex: 1,
  color: colors.white,
};

const PWorkoutsStyles = {
  heroSection,
  heroOverlay,
  heroContent,
  heroTitle,
  heroSubtitle,
  categoryButtonContainer,
  categoryButton,
  sectionContainer,
  workoutArea,
  sidebarCard,
  sidebarButton,
  mergedCardColumn,
  workoutCard,
  workoutImage,
  workoutTitle,
  mergedCard,
  mergedImage,
  mergedDetails,
};

export default PWorkoutsStyles;
