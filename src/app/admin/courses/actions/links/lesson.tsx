import styles from "../index.module.css";
import Link from "next/link";
import { CourseKeyTypes } from "@/typings";

export default function LessonLinks({ slug }: { slug: CourseKeyTypes }) {
  return (
    <Link href={`/admin/courses/${slug}/lessons`} className={styles.secondary}>
      ← До списку уроків
    </Link>
  );
}
