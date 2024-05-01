import { useState, useEffect } from "react";

// Custom hook to handle state persistence with localStorage
export const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    // Initialize state from localStorage if available, or use defaultValue
    const storedState = localStorage.getItem(key);
    return storedState ? JSON.parse(storedState) : defaultValue;
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};
