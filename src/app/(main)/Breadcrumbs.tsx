"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCourses, useLessons } from "@/hooks";
import { HomeIcon } from "@/images";
import styles from "./layout.module.css";

export default function Breadcrumbs() {
  const { currentCourse } = useCourses();
  const { currentLesson } = useLessons();
  const params = useParams();

  return (
    <div className={styles.breadcrumbsContainer}>
      <div className={styles.breadcrumbs}>
        <span className={styles.homeIconContainer}>
          <HomeIcon className={styles.homeIcon} />
        </span>
        <span>/</span>
        <Link href="/courses" className={styles.coursesSegment} scroll={true}>
          Курси
        </Link>
        <span>/</span>
        <Link
          href={`/courses/${params.slug}`}
          scroll={true}
          className={currentCourse ? styles.coursesSegment : styles.skeleton}
        >
          {currentCourse?.title}
        </Link>
        {params.lesson_slug ? (
          <>
            <span>/</span>
            <Link
              href={`/courses/${params.slug}/${params.lesson_slug}`}
              scroll={true}
              className={
                currentLesson?.lesson ? styles.coursesSegment : styles.skeleton
              }
            >
              {currentLesson?.lesson?.title}
            </Link>
          </>
        ) : null}
      </div>
      {!params.lesson_slug ? (
        <h3 className={styles.mainTitle}>{currentCourse?.title}</h3>
      ) : null}
    </div>
  );
}
