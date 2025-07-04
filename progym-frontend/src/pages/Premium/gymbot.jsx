// src/pages/premium/GymBot.jsx

import React, { useState, useEffect, useRef } from 'react';
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
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewChat = async () => {
    const newSession = await startNewSession(user?.id);
    setActiveSessionId(newSession.id);
    setMessages([
      {
        sender: 'bot',
        text: `Yo ${user?.name || 'champ'}! 💪 GymBot here — new premium chat started. Ask me anything about gains!`,
      },
    ]);
    setSessions((prev) => [newSession, ...prev]);
  };

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
    <div style={styles.chatLayout}>
      <button style={styles.toggleSidebarButton} onClick={() => setSidebarVisible(!sidebarVisible)}>
        {sidebarVisible ? '←' : '→'}
      </button>

      <div style={{
        ...styles.sidebar,
        ...(sidebarVisible ? {} : styles.sidebarHidden),
      }}>
        <div style={styles.sidebarTop}>
          <button style={styles.newChatButton} onClick={handleNewChat}>
            + New Chat
          </button>
          <h3 style={styles.sidebarTitle}>💬 GymBot Chats</h3>
          <ul style={styles.sidebarList}>
            {sessions.map((session) => (
              <li
                key={session.id}
                style={styles.sessionItem}
                onClick={() => switchSession(session)}
              >
                {session.title || `Session on ${new Date(session.createdAt).toLocaleDateString()}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>🏋️ Premium GymBot Assistant</h2>

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
  );
}

export default GymBot;
