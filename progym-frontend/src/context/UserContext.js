import { createContext, useState, useEffect, useContext } from "react";

// Create the context to hold global user state
export const UserContext = createContext();

// This component wraps your entire app and provides access to user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Add this function to fix your import error
export const useUserContext = () => useContext(UserContext);
