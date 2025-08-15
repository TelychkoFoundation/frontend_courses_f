"use client";

import CourseInfo from "./CourseInfo";
import CoursePriceCertificate from "./CoursePriceCertificate";
import Lessons from "./Lessons";
import Contents from "./Contents";
import { useLessons } from "@/hooks";
import styles from "./page.module.css";

export default function CoursePage() {
  const { allLessons } = useLessons();

  return (
    <div className={styles.courseLessonsContainer}>
      <section className={styles.courseContainer}>
        <CourseInfo />
        <CoursePriceCertificate />
      </section>
      <section className={styles.lessonsContent}>
        <Contents allLessons={allLessons || []} />
        <div className={styles.lessonsWrapper}>
          <Lessons allLessons={allLessons || []} />
        </div>
      </section>
    </div>
  );
}
