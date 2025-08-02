import styles from "../index.module.css";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { CourseKeyTypes } from "@/typings";

export default function CourseLinks({ slug }: { slug: CourseKeyTypes }) {
  return (
    <>
      <Link href="/admin/courses" className={styles.secondary}>
        ← До списку курсів
      </Link>
      <Link href="/admin/courses/new" className={styles.primary}>
        <IoMdAdd /> Додати курс
      </Link>
      <Link href={`/admin/courses/${slug}/lessons`} className={styles.primary}>
        Список уроків
      </Link>
    </>
  );
}
