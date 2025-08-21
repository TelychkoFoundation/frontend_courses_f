"use client";

import { useAdmin } from "@/hooks";
import { useEffect } from "react";
import styles from "./courses.module.css";
import CoursesTableHeader from "./CoursesTableHeader";
import CoursesTableBody from "./CoursesTableBody";

export default function AdminCoursesPage() {
  const { fetchCourses, loading, totalCourses, courses } = useAdmin();

  useEffect(() => {
    fetchCourses();
    // eslint-disable-[...nextauth]-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className={styles.nonDataMessage}>Завантаження ...</p>;
  }

  if (totalCourses <= 0) {
    return <p className={styles.nonDataMessage}>Курсів немає</p>;
  }

  return (
    <table className={styles.table}>
      <CoursesTableHeader />
      <CoursesTableBody courses={courses} />
    </table>
  );
}
