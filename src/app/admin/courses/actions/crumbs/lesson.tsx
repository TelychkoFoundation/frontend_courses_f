import styles from "../index.module.css";
import Link from "next/link";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CourseKeyTypes } from "@/typings";

interface IProps {
  title: string;
  lessonTitle: string;
  slug: CourseKeyTypes;
}

export default function LessonCrumbs({ title, slug, lessonTitle }: IProps) {
  return (
    <>
      <TfiLayoutLineSolid />
      <Link href={`/admin/courses/${slug}`} className={styles.segment}>
        {title}
      </Link>
      <TfiLayoutLineSolid />
      <Link href={`/admin/courses/${slug}/lessons`} className={styles.segment}>
        Уроки
      </Link>
      <TfiLayoutLineSolid />
      <p className={styles.lastSegment}>{lessonTitle}</p>
    </>
  );
}
