import { createContext, useEffect, useState } from "react";

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on mount & when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Set theme based on current time
  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 18) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  // Toggle between light & dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
