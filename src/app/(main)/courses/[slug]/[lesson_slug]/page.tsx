"use client";

import VideoContainer from "./VideoContainer";
import LessonDetails from "./LessonDetails";
import styles from "./page.module.css";
import { useLessons, useUser } from "@/hooks";
import { useMemo, useState } from "react";
import { IPurchasedLesson } from "@/typings";

export default function CurrentLessonPage() {
  const { currentLesson } = useLessons();
  const { user } = useUser();

  const [showDetails, setShowDetails] = useState<boolean>(true);

  const isLessonPaid: boolean = useMemo(() => {
    if (user && currentLesson) {
      return !!user.purchased_lessons?.find(
        (purchasedLesson: IPurchasedLesson): boolean =>
          purchasedLesson.lesson_id === currentLesson._id,
      );
    }

    return false;
  }, [currentLesson, user]);

  if (!currentLesson) {
    return null;
  }

  return (
    <div className={styles.currentLessonPage}>
      <VideoContainer
        url={currentLesson?.video_key as string}
        isLessonPaid={isLessonPaid}
        setShowDetailsAction={setShowDetails}
        showDetails={showDetails}
      />
      <LessonDetails
        currentLesson={currentLesson}
        setShowDetailsAction={setShowDetails}
        showDetails={showDetails}
      />
    </div>
  );
}
