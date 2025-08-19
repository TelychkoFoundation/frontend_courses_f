"use client";

import { Button } from "@/components";
import { ChevronLeftIcon, ChevronRightIcon } from "@/images";
import { tutorialSteps } from "@/constants";
import styles from "./index.module.css";

export default function TutorialContent({
  step,
  setStepAction,
}: {
  step: number;
  setStepAction: (step: number) => void;
}) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.content}>
        <p>{tutorialSteps[step - 1].description}</p>
      </div>
      <div className={styles.buttons}>
        <Button onClick={() => setStepAction(step - 1)} disabled={step === 1}>
          <div>
            <ChevronLeftIcon
              className={step === 1 ? styles.disabledChevron : styles.chevron}
            />
          </div>
          <span>Назад</span>
        </Button>
        <Button
          onClick={() => setStepAction(step + 1)}
          disabled={step === tutorialSteps.length}
        >
          <span>Далі</span>
          <div>
            <ChevronRightIcon
              className={
                step === tutorialSteps.length
                  ? styles.disabledChevron
                  : styles.chevron
              }
            />
          </div>
        </Button>
      </div>
    </div>
  );
}
