"use client";

import { useState } from "react";
import styles from "./index.module.css";

const languages: string[] = ["UA", "EN"];

export const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("UA");

  const selectLanguage = () => {
    if (selectedLanguage === "UA") {
      setSelectedLanguage("EN");
    } else {
      setSelectedLanguage("UA");
    }
  };

  return (
    <section className={styles.languages} onClick={selectLanguage}>
      {languages.map((language: string) => (
        <div
          key={language}
          className={`${styles.language} ${selectedLanguage === language ? styles.selectedLanguage : ""}`}
        >
          {language}
        </div>
      ))}
    </section>
  );
};
