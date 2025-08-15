"use client";

import { useTransition } from "react";
import { Badge, BadgeSize, BadgeType, Button, ButtonType } from "@/components";
import { LockIcon } from "@/images";
import { createPaymentForLesson } from "@/actions";
import Image from "next/image";
import { useLessons } from "@/hooks";
import Video from "./Video";
import styles from "./index.module.css";

export default function VideoContainer() {
  const { isCurrentLessonPaid, currentLesson } = useLessons();

  const [isPending, startTransition] = useTransition();

  const payForLesson = async () => {
    if (!currentLesson) {
      return;
    }

    startTransition(() =>
      createPaymentForLesson(currentLesson.lesson, window.location.href),
    );
  };

  const renderVideoInfo = () => {
    if (!isCurrentLessonPaid) {
      return (
        <div className={styles.nonPaidButtonContainer}>
          <Button
            type={ButtonType.PRIMARY}
            className={styles.nonPaidButton}
            onClick={payForLesson}
            loading={isPending}
          >
            <Image src={LockIcon} alt="Lock Icon" />
            <span className={styles.price}>46 грн</span>
          </Button>
        </div>
      );
    }

    return (
      <Badge type={BadgeType.InDev} size={BadgeSize.Large}>
        в розробці
      </Badge>
    );
  };

  if (isCurrentLessonPaid) {
    return <Video />;
  }

  return <section className={styles.lock}>{renderVideoInfo()}</section>;
}
