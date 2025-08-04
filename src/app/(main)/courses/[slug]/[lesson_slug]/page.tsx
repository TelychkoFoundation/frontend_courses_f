"use client";

import VideoContainer from "./VideoContainer";
import LessonDetails from "./LessonDetails";
import styles from "./page.module.css";

export default function CurrentLessonPage() {
  return (
    <div className={styles.currentLessonPage}>
      <VideoContainer />
      <LessonDetails />
    </div>
  );
}
