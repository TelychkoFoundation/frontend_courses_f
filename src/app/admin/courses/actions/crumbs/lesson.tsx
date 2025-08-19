import styles from "../index.module.css";
import Link from "next/link";
import { CourseKeyTypes } from "@/typings";

interface IProps {
  title: string;
  lessonTitle: string;
  slug: CourseKeyTypes;
}

export default function LessonCrumbs({ title, slug, lessonTitle }: IProps) {
  return (
    <>
      <Link href={`/admin/courses/${slug}`} className={styles.segment}>
        {title}
      </Link>
      <Link href={`/admin/courses/${slug}/lessons`} className={styles.segment}>
        Уроки
      </Link>
      <p className={styles.lastSegment}>{lessonTitle}</p>
    </>
  );
}
