import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";
import { CoursesHeader } from "./header";

export default async function Page() {
  const response = await getAllAdminCourses("asc");

  console.log(response, "response");

  return (
    <>
      <CoursesHeader />
      <div className={styles.coursesContainer}>
        {response?.data?.map(
          (course: ICourse): ReactElement => (
            <Course key={course.id} data={course} />
          ),
        )}
      </div>
    </>
  );
}
