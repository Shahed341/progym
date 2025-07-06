const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#212121',
    fontFamily: 'Arial, sans-serif',
  },

  // SIDEBAR
  sidebar: {
    width: '260px',
    backgroundColor: '#181818',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 10,
  },

  sidebarControls: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    gap: '10px',
    backgroundColor: '#212121',
    borderBottom: '1px solid #2c2c2e',
  },

  controlButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#303030',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
  },

  chatList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '10px',
  },

  chatItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#303030',
    border: '1px solid #2c2c2e',
    borderRadius: '12px',
    cursor: 'pointer',
  },

  toggleSidebarButton: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    width: '42px',
    height: '42px',
    fontSize: '20px',
    lineHeight: '42px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#303030',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    zIndex: 20,
  },

  // CHAT AREA
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#212121',
    overflow: 'hidden',
  },

  chatBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#171717',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #171717',
  },

  message: {
    maxWidth: '75%',
    padding: '12px 16px',
    margin: '8px 0',
    fontSize: '15px',
    lineHeight: '1.5',
    borderRadius: '12px',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },

  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#10a37f',
    color: '#fff',
  },

  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444654',
    color: '#fff',
  },

  // FORM
  form: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    gap: '10px',
    height: '80px',
    backgroundColor: '#171717',
    borderTop: '1px solid #2c2c2e',
    boxSizing: 'border-box',
  },

  input: {
    flex: 1,
    height: '42px',
    padding: '0 14px',
    fontSize: '15px',
    color: '#fff',
    backgroundColor: '#252525',
    border: '1px solid #333',
    borderRadius: '8px',
    outline: 'none',
    boxShadow: 'none',
  },

  imageButton: {
    width: '42px',
    height: '42px',
    padding: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
  },
};

export default styles;
