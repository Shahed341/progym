// src/styles/GymBotStyle.js

const styles = {
    container: {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      color: '#0d6efd',
      marginBottom: '20px',
    },
    chatBox: {
      backgroundColor: '#ffffff',
      height: '400px',
      overflowY: 'auto',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #dee2e6',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    message: {
      padding: '10px 14px',
      margin: '6px 0',
      borderRadius: '8px',
      maxWidth: '75%',
      lineHeight: '1.4',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#0d6efd',
      color: '#ffffff',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#e9ecef',
      color: '#212529',
    },
    form: {
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ced4da',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#198754',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };
  
  export default styles;
  