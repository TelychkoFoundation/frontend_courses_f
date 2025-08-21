"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType | null;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("theme-dark");
        root.classList.remove("theme-light");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.add("theme-light");
        root.classList.remove("theme-dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
