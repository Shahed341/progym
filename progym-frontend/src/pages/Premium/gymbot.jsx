// File path: src/pages/premium/GymBot.jsx
// This component renders the GymBot premium chat interface with session support and persistent message history.
// Features: new session start, session switching, real-time messaging, sidebar toggle, and auto-scroll.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { askGymBot, fetchSessions, startNewSession } from './GymBotApi';
import styles from '../../styles/premium/GymBotStyle';
import { useUserContext } from '../../context/UserContext';

function GymBot() {
  const { user } = useUserContext();

  // Message and session states
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]); // Holds all chat sessions for sidebar display and switching
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const messagesEndRef = useRef(null);

  // Step 1: Starts a new chat session for the user
  // useCallback prevents unnecessary recreation of handleNewChat on every render unless user info changes
  const handleNewChat = useCallback(async () => {
    try {
      const newSession = await startNewSession(user?.id);
      if (!newSession || !newSession.id) throw new Error('Failed to start session');

      setActiveSessionId(newSession.id);
      setMessages([
        {
          sender: 'bot',
          text: `Hello ${user?.name || 'Champ'}! GymBot here — new premium chat started. Ask me anything about gains!`,
        },
      ]);
      setSessions((prev) => [newSession, ...prev]);
    } catch (err) {
      console.error('Failed to start new session:', err);
      setMessages([
        {
          sender: 'bot',
          text: 'Failed to start new GymBot session. Please try again later.',
        },
      ]);
    }
  }, [user?.id, user?.name]); // Recreate handleNewChat only when user ID or name changes

  // Step 2: On component load, fetch past sessions or start a new one
  useEffect(() => {
    const init = async () => {
      try {
        const sessionList = await fetchSessions(user?.id);
        setSessions(sessionList);

        // If sessions exist, load the latest session and its messages
        if (sessionList.length > 0) {
          setActiveSessionId(sessionList[0].id);
          setMessages(sessionList[0].messages);
        } else {
          handleNewChat();
        }
      } catch (err) {
        console.error('Failed to initialize sessions:', err);
      }
    };

    if (user?.id) init();
  }, [user, handleNewChat]);

  // Step 3: Scroll chat to latest message on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Step 4: Sends message to backend and appends bot response
  const sendMessage = async (msgText) => {
    const userMessage = { sender: 'user', text: msgText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const data = await askGymBot(activeSessionId, msgText);
      const botMessage = {
        sender: 'bot',
        text: data.reply || "GymBot couldn't respond. Try again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'An error occurred. Try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Step 5: Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
  };

  // Step 6: Switch between saved chat sessions
  const switchSession = (session) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  return (
    <div style={{ height: 'calc(100vh - 72px)', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <div style={styles.layout}>
        {/* Sidebar */}
        {sidebarVisible ? (
          <div style={styles.sidebar}>
            <div style={styles.sidebarControls}>
              <button style={{ ...styles.controlButton, flex: '0 0 70%' }} onClick={handleNewChat}>
                + New Chat
              </button>
              <button style={{ ...styles.controlButton, flex: '0 0 30%' }} onClick={() => setSidebarVisible(false)}>
                ←
              </button>
            </div>
            <div style={styles.chatList}>
              {sessions.map((session) => (
                <div key={session.id} style={styles.chatItem} onClick={() => switchSession(session)}>
                  <span>{session.title || `Session ${session.id}`}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSessions((prev) => prev.filter((s) => s.id !== session.id));
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
        ) : (
          // Collapsed sidebar mode
          <div style={styles.collapsedSidebar}>
            <button style={styles.sidebarIconButton} onClick={() => setSidebarVisible(true)}>☰</button>
            <button style={styles.sidebarIconButton} onClick={handleNewChat}>＋</button>
          </div>
        )}

        {/* Chat area */}
        <div style={styles.chatContainer}>
          <div style={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage),
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
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
