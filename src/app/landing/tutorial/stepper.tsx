"use client";

import { ReactElement } from "react";
import { DeviceType, DeviceTypes, useDeviceType } from "@/hooks";
import { tutorialSteps } from "@/constants";
import { ITutorialStep } from "@/typings";
import styles from "./index.module.css";

export default function Stepper({
  step,
  setStepAction,
}: {
  step: number;
  setStepAction: (step: number) => void;
}) {
  const deviceType: DeviceType = useDeviceType();

  return (
    <>
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
      {deviceType === DeviceTypes.mobile ? (
        <div className={styles.stepTitleMobile}>
          {tutorialSteps[step - 1].title}
        </div>
      ) : null}
    </>
  );
}
