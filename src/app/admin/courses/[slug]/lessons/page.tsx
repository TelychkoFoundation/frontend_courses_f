"use client";

import { useAdmin } from "@/hooks";
import { useEffect } from "react";
import styles from "../../courses.module.css";
import LessonsTableHeader from "./LessonsTableHeader";
import LessonsTableBody from "./LessonsTableBody";

export default function LessonsPage() {
  const {
    fetchLessons,
    loading,
    totalLessons,
    currentCourse,
    fetchCourse,
    lessons,
  } = useAdmin();

  useEffect(() => {
    if (currentCourse) {
      fetchLessons(currentCourse.id);
    } else {
      fetchCourse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCourse]);

  if (loading) {
    return <p className={styles.nonDataMessage}>Завантаження ...</p>;
  }

  if (totalLessons <= 0 || lessons.length <= 0) {
    return <p className={styles.nonDataMessage}>Уроків немає</p>;
  }

  return (
    <table className={styles.table}>
      <LessonsTableHeader />
      <LessonsTableBody lessons={lessons} />
    </table>
  );
}
