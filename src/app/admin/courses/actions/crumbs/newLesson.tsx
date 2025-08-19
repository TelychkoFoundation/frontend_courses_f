import styles from "../index.module.css";
import Link from "next/link";
import { CourseKeyTypes } from "@/typings";

interface IProps {
  title: string;
  slug: CourseKeyTypes;
}

export default function NewLessonCrumbs({ title, slug }: IProps) {
  return (
    <>
      <Link href={`/admin/courses/${slug}`} className={styles.segment}>
        {title}
      </Link>
      <Link href={`/admin/courses/${slug}/lessons`} className={styles.segment}>
        Уроки
      </Link>
      <p className={styles.lastSegment}>Новий</p>
    </>
  );
}
