// src/styles/Register.js

const registerStyles = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    backgroundColor: '#111827',
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(8px)',
    zIndex: -1,
  },
  formContainer: {
    background: 'rgba(31, 41, 55, 0.95)', // deep dark
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    color: '#f3f4f6',
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: '15px',
    padding: '12px',
    border: '1px solid #facc15',
    backgroundColor: '#1f2937',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#f3f4f6',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    backgroundColor: '#facc15',
    color: '#1f2937',
    fontSize: '18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default registerStyles;
