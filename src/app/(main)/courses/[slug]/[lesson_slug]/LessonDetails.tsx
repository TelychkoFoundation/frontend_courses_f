"use client";

import styles from "./page.module.css";
import { LuTableOfContents } from "react-icons/lu";
import { useLessons } from "@/hooks";
import { useRouter } from "next/navigation";

export default function LessonDetails() {
  const { currentLesson, setCurrentLesson } = useLessons();

  const router = useRouter();

  const redirectToLessons = () => {
    router.back();
  };

  return (
    <div className={styles.lessonDetails}>
      <div className={styles.lessonDetailsHeader}>
        <h2 className={styles.lessonTitle}>{"currentLesson"}</h2>
        <LuTableOfContents size={20} onClick={redirectToLessons} />
      </div>
      <div className={`${styles.lessonItem} ${styles.active}`}>
        <span className={styles.lessonTitle}>{currentLesson?.title}</span>
        <span className={styles.lessonNumber}>08:12</span>
      </div>
    </div>
  );
}
