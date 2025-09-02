"use client";

import { useTransition } from "react";
import { Badge, BadgeSize, BadgeType, Button, ButtonType } from "@/components";
import { LockIcon } from "@/images";
import { createPaymentForLesson } from "@/actions";
import { useAuth, useLessonDetails, useLessons } from "@/hooks";
import Video from "./Video";
import { useSession } from "next-auth/react";
import styles from "./index.module.css";

const isPublished = false;

export default function VideoContainer() {
  const { currentLesson } = useLessons();
  const { updateLessonVideoDuration } = useAuth();
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();
  const { isCurrentLessonPaid } = useLessonDetails(
    currentLesson?.lesson._id as string,
    currentLesson?.lesson.course_id as string,
  );

  const payForLesson = async () => {
    if (!currentLesson) {
      return;
    }

    if (!data) {
      return;
    }

    startTransition(() =>
      createPaymentForLesson(
        data.user?.id as string,
        currentLesson.lesson,
        window.location.href,
      ),
    );
  };

  const renderVideoInfo = () => {
    if (isCurrentLessonPaid) {
      return (
        <Video
          currentLesson={currentLesson}
          updateLessonVideoDuration={updateLessonVideoDuration}
        />
      );
    }

    if (!isPublished) {
      return (
        <Badge type={BadgeType.InDev} size={BadgeSize.Large}>
          в розробці
        </Badge>
      );
    }

    return (
      <div className={styles.nonPaidButtonContainer}>
        <Button
          type={ButtonType.PRIMARY}
          className={styles.nonPaidButton}
          onClick={payForLesson}
          loading={isPending}
        >
          <LockIcon className={styles.lockIcon} />
          <span className={styles.price}>46 грн</span>
        </Button>
      </div>
    );
  };

  return (
    <section
      className={`${styles.videoContainer} ${isCurrentLessonPaid ? styles.active : ""}`}
    >
      <div className={isCurrentLessonPaid ? styles.unlock : styles.lock}>
        {renderVideoInfo()}
      </div>
    </section>
  );
}
