const BASE_URL = 'http://localhost:5000/api/gymbot';

export const askGymBot = async (sessionId, message) => {
  const response = await fetch(`${BASE_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId, message }),
  });

  if (!response.ok) {
    throw new Error('GymBot API failed');
  }

  return await response.json();
};

export const fetchSessions = async (userId) => {
  const response = await fetch(`${BASE_URL}/sessions/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch GymBot sessions');
  }

  return await response.json();
};

export const startNewSession = async (userId) => {
  const response = await fetch(`${BASE_URL}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to start new session');
  }

  return await response.json();
};
