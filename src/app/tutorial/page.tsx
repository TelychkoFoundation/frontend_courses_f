"use client";

import Link from "next/link";
import Stepper from "./stepper";
import TutorialContent from "./content";
import { tutorialMainHeaders, tutorialSteps } from "@/constants";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Page() {
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
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>{tutorialMainHeaders.title}</h1>
        <p className={styles.subtitle}>{tutorialMainHeaders.subTitle}</p>

        <Stepper step={step} setStepAction={setStep} />

        <TutorialContent step={step} />

        <div className={styles.buttons}>
          <button onClick={() => setStep(step - 1)} disabled={step === 1}>
            Назад
          </button>
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === tutorialSteps.length}
          >
            Далі
          </button>
        </div>
      </section>
      <Link href="/services">Послуги</Link>
    </div>
  );
}
