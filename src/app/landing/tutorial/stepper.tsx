"use client";

import styles from "./index.module.css";
import { tutorialSteps } from "@/constants";
import { ITutorialStep } from "@/typings";
import { ReactElement } from "react";

export default function Stepper({
  step,
  setStepAction,
}: {
  step: number;
  setStepAction: (step: number) => void;
}) {
  return (
    <div className={styles.stepperContainer}>
      {step
        ? tutorialSteps.map(
            ({ id, title }: ITutorialStep): ReactElement => (
              <div key={id} className={styles.stepWrapper}>
                <div
                  className={`${styles.circle} ${
                    id <= step ? styles.circleActive : ""
                  } ${id === step ? styles.circleLastActive : ""}`}
                  onClick={() => setStepAction(id)}
                >
                  {id}
                </div>
                {id < tutorialSteps.length && (
                  <div
                    className={`${styles.line} ${
                      id < step ? styles.lineFilled : ""
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
}
