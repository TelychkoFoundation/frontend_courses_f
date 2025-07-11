"use client";

import styles from "./courses.module.css";
import { FiRefreshCcw } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

import Link from "next/link";
import { useAdmin } from "../../hooks/useAdmin";

export default function AdminTableActions() {
  const { fetchCourses, courses } = useAdmin();

  return (
    <div className={styles.header}>
      <h1>Курси</h1>
      <div className={styles.headerActions}>
        {courses.length ? (
          <button
            className={`${styles.iconButton} ${styles.refresh}`}
            title="Оновити"
            onClick={fetchCourses}
          >
            <FiRefreshCcw size={20} />
          </button>
        ) : null}
        <Link href="/admin/courses/new" className={styles.createBtn}>
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}
