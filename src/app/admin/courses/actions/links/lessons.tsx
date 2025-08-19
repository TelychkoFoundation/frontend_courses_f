import styles from "../index.module.css";
import Link from "next/link";
import { useAdmin } from "@/hooks";
import { CourseKeyTypes } from "@/typings";

export default function LessonsLinks({ slug }: { slug: CourseKeyTypes }) {
  const { fetchLessons, currentCourse } = useAdmin();

  return (
    <>
      <button
        className={`${styles.iconButton} ${styles.refresh}`}
        title="Оновити"
        onClick={() => fetchLessons(currentCourse?.id as string)}
      >
        рефреш
      </button>

      <Link href={`/admin/courses/${slug}`} className={styles.secondary}>
        ← До поточного курсу
      </Link>
      <Link
        href={`/admin/courses/${slug}/lessons/new`}
        className={styles.primary}
      >
        Додати урок
      </Link>
    </>
  );
}
