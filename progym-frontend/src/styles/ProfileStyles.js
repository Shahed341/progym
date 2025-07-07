// src/styles/ProfileStyles.js

const profileStyles = {
  pageWrapper: {
    backgroundColor: '#F5F2EB', // soft white cream
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1E1E1E',
  },
  profileCard: {
    backgroundColor: '#1E1E1E', // dark card
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
    color: '#F5F5F5',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '3px solid #4A4A4A', // ash border
    marginBottom: '20px',
  },
  username: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: '8px',
  },
  email: {
    fontSize: '1rem',
    color: '#CCCCCC', // light gray
    marginBottom: '16px',
  },
  premiumTag: {
    color: '#D6BD98',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px',
  },
  editButton: {
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #888888', // ash border
    backgroundColor: '#2A2A2A',
    color: '#F5F5F5',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  logoutButton: {
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #FF5C5C',
    backgroundColor: '#FF5C5C',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  premiumPanel: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  premiumButton: {
    backgroundColor: '#4A4A4A',
    padding: '10px 18px',
    borderRadius: '10px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  authButton: {
    padding: '10px 24px',
    backgroundColor: '#4A4A4A',
    color: '#FFFFFF',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '1.25rem',
    color: '#333333',
  },
};

export default profileStyles;
