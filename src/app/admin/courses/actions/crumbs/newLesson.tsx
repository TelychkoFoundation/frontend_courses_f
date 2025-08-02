import styles from "../index.module.css";
import Link from "next/link";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CourseKeyTypes } from "@/typings";

interface IProps {
  title: string;
  slug: CourseKeyTypes;
}

export default function NewLessonCrumbs({ title, slug }: IProps) {
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
      <p className={styles.lastSegment}>Новий</p>
    </>
  );
}
