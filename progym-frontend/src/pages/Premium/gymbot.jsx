import React, { useState, useEffect, useRef, useCallback } from 'react';
import { askGymBot, fetchSessions, startNewSession } from './GymBotApi';
import styles from '../../styles/premium/GymBotStyle';
import { useUserContext } from '../../context/UserContext';

function GymBot() {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const messagesEndRef = useRef(null);

  const handleNewChat = useCallback(async () => {
    const newSession = await startNewSession(user?.id);
    setActiveSessionId(newSession.id);
    setMessages([
      {
        sender: 'bot',
        text: `Yo ${user?.name || 'champ'}! 💪 GymBot here — new premium chat started. Ask me anything about gains!`,
      },
    ]);
    setSessions((prev) => [newSession, ...prev]);
  }, [user?.id, user?.name]);

  useEffect(() => {
    const init = async () => {
      const sessionList = await fetchSessions(user?.id);
      setSessions(sessionList);
      if (sessionList.length > 0) {
        setActiveSessionId(sessionList[0].id);
        setMessages(sessionList[0].messages);
      } else {
        handleNewChat();
      }
    };
    if (user?.id) init();
  }, [user, handleNewChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (msgText) => {
    const userMessage = { sender: 'user', text: msgText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await askGymBot(activeSessionId, msgText);
      const botMessage = {
        sender: 'bot',
        text: data.reply || "Hmm... GymBot's still catching his breath. Try again!",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ GymBot hit a wall. Try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
  };

  const switchSession = (session) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  return (
    <div
      style={{
        height: 'calc(100vh - 72px)',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={styles.layout}>
        {sidebarVisible && (
  <div style={styles.sidebar}>
    <div style={styles.sidebarControls}>
      <button
        style={{ ...styles.controlButton, flex: '0 0 70%' }}
        onClick={handleNewChat}
      >
        + New Chat
      </button>
      <button
        style={{ ...styles.controlButton, flex: '0 0 30%' }}
        onClick={() => setSidebarVisible(false)}
      >
        ←
      </button>
    </div>

    <div style={styles.chatList}>
      {sessions.map((session) => (
        <div
          key={session.id}
          style={styles.chatItem}
          onClick={() => switchSession(session)}
        >
          <span>{session.title || `Session ${session.id}`}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSessions((prev) =>
                prev.filter((s) => s.id !== session.id)
              );
            }}
            style={{
              background: 'none',
              color: 'red',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  </div>
)}

{!sidebarVisible && (
  <button
    style={styles.toggleSidebarButton}
    onClick={() => setSidebarVisible(true)}
  >
    ☰
  </button>
)}
        <div style={styles.chatContainer}>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage),
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything like 'Back workout for mass?'"
              style={styles.input}
              disabled={loading}
            />
            <button type="submit" style={styles.imageButton} disabled={loading}>
              <img
                src="/images/gymbot/gymbot_enter_button.png"
                alt="Send"
                style={{ width: '100%', height: '100%' }}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GymBot;
