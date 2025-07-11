import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";

export default async function Page() {
  const response = await getAllAdminCourses();

  return (
    <div className={styles.coursesContainer}>
      {response?.data?.map(
        (course: ICourse): ReactElement => (
          <Course key={course.id} data={course} />
        ),
      )}
    </div>
  );
}
