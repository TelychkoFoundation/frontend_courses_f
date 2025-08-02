import styles from "../index.module.css";
import Link from "next/link";

export default function NewCourseLinks() {
  return (
    <Link href="/admin/courses" className={styles.secondary}>
      ← До списку курсів
    </Link>
  );
}
