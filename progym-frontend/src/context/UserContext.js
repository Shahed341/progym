// src/context/UserContext.js

import { createContext, useState, useEffect } from "react";

// Create the context to hold global user state
export const UserContext = createContext();

// This component wraps your entire app and provides access to user state
export const UserProvider = ({ children }) => {
  // Initialize the user state from localStorage (persistent login)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user"); // Try to read saved user
    return stored ? JSON.parse(stored) : null;   // Parse if exists, else null
  });

  // Watch for changes to `user` state and sync with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save on login
    } else {
      localStorage.removeItem("user"); // Clear on logout
    }
  }, [user]); // Runs every time user state changes

  // Return the context provider and pass `user` and `setUser` to consumers
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Makes context available to all children */}
    </UserContext.Provider>
  );
};
