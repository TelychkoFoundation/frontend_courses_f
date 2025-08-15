import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllCourses } from "@/actions";
// getMyCourses
import Course from "./Course";
import { ICourse } from "@/typings";

export default async function CourseList() {
  const response = await getAllCourses();

  const renderList = () => {
    if (response?.success) {
      if (response.data.length) {
        return response.data.map(
          (course: ICourse): ReactElement => (
            <Course key={course.id} course={course} />
          ),
        );
      }

      return null;
    }
  };

  return <div className={styles.courses}>{renderList()}</div>;
}
