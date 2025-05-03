// src/pages/premium/GymBotApi.js
export const askGymBot = async (message) => {
  const response = await fetch('http://localhost:5000/api/gymbot/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('GymBot API failed');
  }

  return await response.json();
};
