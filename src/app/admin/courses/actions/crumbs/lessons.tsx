import styles from "../index.module.css";
import Link from "next/link";
import { CourseKeyTypes } from "@/typings";

interface IProps {
  title: string;
  slug: CourseKeyTypes;
}

export default function LessonsCrumbs({ title, slug }: IProps) {
  return (
    <>
      <Link href={`/admin/courses/${slug}`} className={styles.segment}>
        {title}
      </Link>

      <p className={styles.lastSegment}>Уроки</p>
    </>
  );
}
