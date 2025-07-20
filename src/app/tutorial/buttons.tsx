"use client";

import styles from "./page.module.css";
import { tutorialSteps } from "@/constants";
import { QueryType } from "@/typings";
import { useQuery } from "@/hooks";

export const Buttons = ({ step }: { step: number }) => {
  const { addQueryString } = useQuery();

  return (
    <div className={styles.buttons}>
      <button
        onClick={() => addQueryString(QueryType.TutorialStep, String(step - 1))}
        disabled={String(step) === "1"}
      >
        Назад
      </button>
      <button
        onClick={() => addQueryString(QueryType.TutorialStep, String(step + 1))}
        disabled={step === tutorialSteps.length}
      >
        Далі
      </button>
    </div>
  );
};
