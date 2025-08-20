"use client";

import { useState, useMemo } from "react";
import { feedbacks } from "@/constants";
import { IFeedback } from "@/typings";
import Link from "next/link";
import { DeviceType, DeviceTypes, useDeviceType } from "@/hooks";
import { Badge, BadgeType, Button } from "@/components";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/images";
import styles from "./index.module.css";

export default function Feedback() {
  const [id, setId] = useState<string>("1");
  const deviceType: DeviceType = useDeviceType();

  const activeFeedback: IFeedback | undefined = useMemo(() => {
    return feedbacks.find((feedback: IFeedback): boolean => feedback.id === id);
  }, [id]);

  return (
    <section className={styles.container}>
      <div className={styles.ellipse} />
      <h2 className={styles.title}>Відгуки</h2>
      <section className={styles.feedbacks}>
        {feedbacks.map((feedback: IFeedback) => (
          <div key={feedback.id} className={styles.feedback}>
            <div className={styles.feedbackHeader}>
              <h2 className={styles.feedbackTitle}>{feedback.name}</h2>
              <Link
                href={feedback.link}
                target="_blank"
                className={styles.feedbackShort}
              >
                {feedback.link}
              </Link>
            </div>
            <div className={styles.feedbackStars}>
              {Array.from({ length: 5 }).map((_, i: number) => (
                <StarIcon
                  key={i}
                  filled={feedback.stars > i}
                  className={styles.feedbackStar}
                  stroke={styles.stroke}
                />
              ))}
            </div>
            <p className={styles.feedbackDescription}>{feedback.message}</p>
            <div className={styles.courses}>
              {feedback.courses.map((course: string) => (
                <Badge key={course} type={BadgeType.Tag}>
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </section>
      <div className={styles.buttons}>
        <Button
        // onClick={() => setStepAction(step - 1)} disabled={step === 1}
        >
          <div>
            <ChevronLeftIcon
              className={id === "1" ? styles.disabledChevron : styles.chevron}
            />
          </div>
        </Button>
        <Button
        // onClick={() => setStepAction(step + 1)}
        // disabled={step === tutorialSteps.length}
        >
          <div>
            <ChevronRightIcon
              className={
                Number(id) === feedbacks.length
                  ? styles.disabledChevron
                  : styles.chevron
              }
            />
          </div>
        </Button>
      </div>
    </section>
  );
}
