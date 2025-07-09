"use client";

import styles from "./courses.module.css";
import { getAllCourses } from "../../lib/getActions";
import { FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";

export default function AdminTableHeader() {
  const reFetch = async () => {
    await getAllCourses();
  };

  return (
    <div className={styles.header}>
      <h1>Курси</h1>
      <div className={styles.headerActions}>
        <button
          className={`${styles.iconButton} ${styles.refresh}`}
          title="Оновити"
          onClick={reFetch}
        >
          <FiRefreshCcw size={20} />
        </button>
        <Link href="/admin/courses/new" className={styles.createBtn}>
          + Створити курс
        </Link>
      </div>
    </div>
  );
}
