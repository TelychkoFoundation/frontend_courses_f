"use client";

import styles from "./page.module.css";
import { tutorialSteps } from "@/constants";
import { ITutorialStep, QueryType } from "@/typings";
import { ReactElement, useEffect } from "react";
import { useQuery } from "@/hooks";

export const Stepper = ({ step }: { step: number }) => {
  const { addQueryString } = useQuery();

  useEffect(() => {
    if (step > tutorialSteps.length || step <= 0) {
      addQueryString(QueryType.TutorialStep, "1");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        addQueryString(
          QueryType.TutorialStep,
          step < tutorialSteps.length ? String(step + 1) : String(step),
        );
      }
      if (e.key === "ArrowLeft") {
        addQueryString(
          QueryType.TutorialStep,
          step > 1 ? String(step - 1) : String(step),
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step]);

  return (
    <div className={styles.stepperContainer}>
      {step
        ? tutorialSteps.map(
            ({ id, title }: ITutorialStep): ReactElement => (
              <div key={id} className={styles.stepWrapper}>
                <div
                  className={`${styles.circle} ${
                    Number(id) <= step ? styles.circleActive : ""
                  } ${Number(id) === step ? styles.circleLastActive : ""}`}
                  onClick={() => addQueryString(QueryType.TutorialStep, id)}
                >
                  {id}
                </div>
                {Number(id) < tutorialSteps.length && (
                  <div
                    className={`${styles.line} ${
                      Number(id) < step ? styles.lineFilled : ""
                    }`}
                  />
                )}
                <div className={styles.stepTitle}>{title}</div>
              </div>
            ),
          )
        : null}
    </div>
  );
};
