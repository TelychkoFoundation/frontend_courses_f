import styles from "../index.module.css";
import Link from "next/link";
import { useAdmin } from "@/hooks";

export default function CoursesLinks() {
  const { fetchCourses } = useAdmin();

  return (
    <>
      <button
        className={`${styles.iconButton} ${styles.refresh}`}
        title="Оновити"
        onClick={fetchCourses}
      >
        рефреш
      </button>
      <Link href="/admin/courses/new" className={styles.primary}>
        Додати курс
      </Link>
    </>
  );
}
