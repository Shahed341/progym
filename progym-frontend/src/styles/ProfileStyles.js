// src/styles/ProfileStyle.js

const profileStyles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    color: '#f3f4f6', // light gray text
    backgroundColor: '#111827', // dark background
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#facc15', // royal gold
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#1f2937', // dark card
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.5)',
    maxWidth: '500px',
    margin: '0 auto',
    color: '#f3f4f6',
  },
  editButton: {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #facc15',
    backgroundColor: '#1f2937',
    color: '#facc15',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  editButtonHover: {
    backgroundColor: '#facc15',
    color: '#1f2937',
  },
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    color: '#f3f4f6',
  },
  buttonRow: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  authButton: {
    padding: '10px 24px',
    backgroundColor: '#facc15',
    color: '#1f2937',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '10px',
    padding: '10px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #dc2626',
    backgroundColor: '#dc2626',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default profileStyles;
