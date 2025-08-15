"use client";

import { useState } from "react";
import styles from "./index.module.css";

const languages: string[] = ["UA", "EN"];

export const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("UA");

  return (
    <section className={styles.languages}>
      {languages.map((language: string, index: number) => (
        <div
          key={index}
          className={`${styles.language} ${selectedLanguage === language ? styles.selectedLanguage : ""}`}
          onClick={() => setSelectedLanguage(language)}
        >
          {language}
        </div>
      ))}
    </section>
  );
};
