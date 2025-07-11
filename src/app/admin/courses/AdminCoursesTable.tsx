"use client";

import { useEffect } from "react";
import AdminCoursesTableHeader from "./AdminCoursesTableHeader";
import AdminTableBody from "./AdminCoursesTableBody";
import styles from "./courses.module.css";
import { useAdmin } from "../../hooks/useAdmin";

export default function AdminCoursesTable() {
  const { fetchCourses, loading, courses } = useAdmin();

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <p className={styles.nonDataMessage}>Завантаження ...</p>;
  }

  if (!courses.length) {
    return <p className={styles.nonDataMessage}>Курсів немає</p>;
  }

  return (
    <table className={styles.table}>
      <AdminCoursesTableHeader />
      <AdminTableBody />
    </table>
  );
}
