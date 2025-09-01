"use client";

import VideoContainer from "./VideoContainer";
import Options from "./Options";
import { useLessons, useScrollToTop } from "@/hooks";
import Pagination from "./Pagination";
import RelatedLessons from "../RelatedLessons";
import styles from "./page.module.css";

export default function CurrentLessonPage() {
  const { currentLesson } = useLessons();
  useScrollToTop();

  if (!currentLesson) {
    return null;
  }

  return (
    <>
      <div className={styles.currentLessonPage}>
        <article className={styles.currentLessonVideo}>
          <VideoContainer />
          <section className={styles.paginationContainer}>
            <Pagination />
          </section>
        </article>
        <article className={styles.currentLessonOptions}>
          <Options />
        </article>
      </div>
      <section className={styles.relatedLessonsContainer}>
        <RelatedLessons />
      </section>
    </>
  );
}
