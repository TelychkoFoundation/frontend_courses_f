import { ICourse } from "@/typings";
import Link from "next/link";
import Inactive from "./inactive";
import Content from "./content";
import styles from "../page.module.css";

interface ICourseProps {
  course: ICourse;
}

export default function Item({ course }: ICourseProps) {
  if (!course.is_published) {
    return (
      <Inactive id={course.id}>
        <Content course={course} />
      </Inactive>
    );
  }

  return (
    <Link
      href={`/courses/${course.courseKey}`}
      className={styles.courseContainer}
    >
      <Content course={course} />
    </Link>
  );
}
