// src/styles/premium/CalorieTrackerStyles.js

const colors = {
  pageBg: '#ece9e2',      // background for the entire page
  cardBg: '#1e1e1e',      // background for cards/panels
  accent: '#f03238ff',    // accent color for buttons and highlights
  white: '#FFFFFF',       // primary text color
};

export const container = {
  background: colors.pageBg,
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

export const card = {
  background: colors.cardBg,
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  width: '100%',
  maxWidth: '500px',
  color: colors.white,
};

export const title = {
  marginBottom: '20px',
  fontSize: '24px',
  color: colors.accent,
  textAlign: 'center',
};

export const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '15px',
};

export const label = {
  marginBottom: '5px',
  fontSize: '16px',
  color: colors.white,
};

export const input = {
  padding: '10px',
  borderRadius: '6px',
  border: `1px solid ${colors.accent}`,
  background: colors.white,
  color: colors.cardBg,
  fontSize: '16px',
  outline: 'none',
};

export const button = {
  width: '100%',
  padding: '12px',
  marginTop: '10px',
  background: colors.accent,
  color: colors.white,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  transition: 'transform 0.2s ease',
};

export const status = {
  marginTop: '15px',
  textAlign: 'center',
  color: colors.white,
};

// Assign the styles object to a variable for named export
const CalorieTrackerStyles = {
  container,
  card,
  title,
  formGroup,
  label,
  input,
  button,
  status,
};

export default CalorieTrackerStyles;
