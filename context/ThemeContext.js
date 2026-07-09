import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import { getData, saveData } from "../storage/storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await getData("isDarkTheme");

      if (savedTheme !== null) {
        setIsDark(savedTheme);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark;

      setIsDark(newTheme);

      await saveData("isDarkTheme", newTheme);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;