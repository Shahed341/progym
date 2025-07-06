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
    borderBottom: '1px solid #2c2c2e',
    padding: '10px',
    gap: '10px',
    backgroundColor: '#212121',
  },

  controlButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#303030',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
  },

  chatList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },

  chatItem: {
    padding: '14px',
    backgroundColor: '#303030',
    borderBottom: '1px solid #2c2c2e',
    color: '#fff',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },

  toggleSidebarButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    backgroundColor: '#10a37f',
    color: '#fff',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 14px',
    cursor: 'pointer',
    zIndex: 20,
  },

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
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#171717',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #171717',
  },

  message: {
    padding: '12px 16px',
    margin: '8px 0',
    borderRadius: '12px',
    maxWidth: '75%',
    fontSize: '15px',
    lineHeight: '1.5',
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

  form: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    gap: '10px',
    backgroundColor: '#212121',
    borderTop: '1px solid #2c2c2e',
    height: '80px',
    boxSizing: 'border-box',
  },

  input: {
    flex: 1,
    height: '100%',
    padding: '0 14px',
    fontSize: '15px',
    backgroundColor: '#303030',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
  },

  imageButton: {
    height: '42px',
    width: '42px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: 0,
    overflow: 'hidden',
  },
};

export default styles;
