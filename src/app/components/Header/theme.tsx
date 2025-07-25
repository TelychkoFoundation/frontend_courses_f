"use client";

import { useTheme } from "@/hooks";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import styles from "./index.module.css";

export const Theme = () => {
  const { theme, toggleTheme } = useTheme();

  const renderThemeIcon = () => {
    if (theme === "dark") {
      return <MdOutlineLightMode size={24} />;
    }

    return <MdOutlineDarkMode size={24} />;
  };

  return (
    <div onClick={toggleTheme} className={styles.theme}>
      {renderThemeIcon()}
    </div>
  );
};
