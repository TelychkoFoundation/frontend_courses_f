"use client";

import { useLessons } from "@/hooks";
import styles from "./index.module.css";
import { LuTableOfContents } from "react-icons/lu";

interface LessonDetailsDrawerProps {
  lessonCategory: string;
}

export default function LessonDetailsDrawer(props: LessonDetailsDrawerProps) {
  const { currentLesson, setCurrentLesson } = useLessons();

  return (
    <div className={styles.lessonDetailsContainer}>
      <div className={styles.lessonDetailsHeader}>
        <h2 className={styles.lessonTitle}>{props.lessonCategory}</h2>
        <LuTableOfContents size={20} onClick={() => setCurrentLesson(null)} />
      </div>
      <div className={`${styles.lessonItem} ${styles.active}`}>
        <span className={styles.lessonTitle}>{currentLesson?.title}</span>
        <span className={styles.lessonNumber}>08:12</span>
      </div>
    </div>
  );
}
