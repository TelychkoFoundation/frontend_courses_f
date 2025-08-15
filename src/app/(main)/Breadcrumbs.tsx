"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { useCourses, useLessons } from "@/hooks";
import styles from "./layout.module.css";

export default function Breadcrumbs() {
  const { currentCourse } = useCourses();
  const { currentLesson } = useLessons();
  const params = useParams();

  return (
    <div className={styles.breadcrumbsContainer}>
      <div className={styles.breadcrumbs}>
        <FaHome size={14} />
        <span>/</span>
        <Link href="/courses" className={styles.coursesSegment}>
          Курси
        </Link>
        <span>/</span>
        <Link
          href={`/courses/${params.slug}`}
          className={styles.coursesSegment}
        >
          {currentCourse?.title}
        </Link>
        {params.lesson_slug ? (
          <>
            <span>/</span>
            <span className={styles.coursesSegment}>
              {currentLesson?.lesson?.title}
            </span>
          </>
        ) : null}
      </div>
      {!params.lesson_slug ? (
        <h3 className={styles.mainTitle}>{currentCourse?.title}</h3>
      ) : null}
    </div>
  );
}
