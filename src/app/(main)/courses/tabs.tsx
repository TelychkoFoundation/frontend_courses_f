"use client";

import { useState } from "react";
import styles from "./tabs.module.css";

export default function CourseTabs({
  onTabChange,
}: {
  onTabChange?: (tab: "all" | "my") => void;
}) {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");

  const handleTabClick = (tab: "all" | "my") => {
    setActiveTab(tab);
    // onTabChange(tab);
  };

  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
        onClick={() => handleTabClick("all")}
      >
        Всі курси
      </button>
      <button
        className={`${styles.tab} ${activeTab === "my" ? styles.active : ""}`}
        onClick={() => handleTabClick("my")}
      >
        Мої курси
      </button>
    </div>
  );
}
