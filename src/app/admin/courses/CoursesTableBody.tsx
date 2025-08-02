"use client";

import { CourseKeyTypes, ICourse } from "@/typings";
import styles from "./courses.module.css";
import { useRouter } from "next/navigation";

interface IProps {
  courses: ICourse[];
}

export default function CoursesTableBody({ courses }: IProps) {
  const router = useRouter();

  const handleActiveCourse = (courseKey: CourseKeyTypes) => {
    router.push(`/admin/courses/${courseKey}`);
  };

  return (
    <tbody>
      {courses.map(
        (
          {
            id,
            title,
            price,
            is_free,
            is_published,
            createdAt,
            lessons,
            courseKey,
          }: ICourse,
          index: number,
        ) => (
          <tr
            key={id}
            onClick={() => handleActiveCourse(courseKey)}
            className={styles.row}
          >
            <td>{index + 1}</td>
            <td title={title}>{title}</td>
            <td title={String(price)}>
              {is_free ? "Безкоштовний" : `${price}₴`}
            </td>
            <td>{lessons.length}</td>
            <td>{is_published ? "✅" : "❌"}</td>
            <td>{new Date(createdAt).toLocaleDateString("uk-UA")}</td>
          </tr>
        ),
      )}
    </tbody>
  );
}
