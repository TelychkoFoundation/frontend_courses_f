"use client";

import { useState, useEffect } from "react";
import Stepper from "./stepper";
import TutorialContent from "./content";
import { tutorialMainHeaders, tutorialSteps } from "@/constants";
import styles from "./index.module.css";

export default function Tutorial() {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setStep(step < tutorialSteps.length ? step + 1 : step);
      }
      if (e.key === "ArrowLeft") {
        setStep(step > 1 ? step - 1 : step);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  return (
    <section className={styles.section}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{tutorialMainHeaders.title}</h1>
        <p className={styles.subtitle}>{tutorialMainHeaders.subTitle}</p>
      </div>

      <Stepper step={step} setStepAction={setStep} />

      <TutorialContent step={step} setStepAction={setStep} />
    </section>
  );
}
