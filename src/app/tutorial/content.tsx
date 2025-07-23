"use client";

import { tutorialSteps } from "@/constants";
import styles from "./page.module.css";

export default function TutorialContent({ step }: { step: number }) {
  return (
    <div className={styles.content}>
      <p>{tutorialSteps[step - 1].description}</p>
    </div>
  );
}
