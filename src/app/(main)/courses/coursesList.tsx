import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllCourses } from "@/lib";
import CoursesListItem from "./coursesListItem";
import { ICourse } from "@/typings";

export default async function CoursesList() {
  const response = await getAllCourses();

  if (!response.success) {
    return null;
  }

  return (
    <div className={styles.coursesContainer}>
      {response.data.map(
        (course: ICourse): ReactElement => (
          <CoursesListItem key={course.id} data={course} />
        ),
      )}
    </div>
  );
}
