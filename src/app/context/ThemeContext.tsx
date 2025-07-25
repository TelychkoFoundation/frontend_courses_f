"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

type ThemeType = "light" | "dark";

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
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "dark" ? "dark" : "light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme !== null) {
      const root = document.documentElement;

      if (theme === "dark") {
        root.classList.add("theme-dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("theme-dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: ThemeType = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
