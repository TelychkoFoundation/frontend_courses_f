import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";
import CourseTabs from "./tabs";

export default async function Page() {
  const response = await getAllAdminCourses();

  console.log(response, "response");

  if (!response.success) {
    return null;
  }

  const handleTabChange = (tab: "all" | "my") => {
    // if (tab === "all") {
    //   setFilteredCourses(courses);
    // } else {
    //   const myCourses = courses.filter(course => course.is_free); // приклад фільтра
    //   setFilteredCourses(myCourses);
    // }
  };

  return (
    <div className={styles.page}>
      {/*<motion.div className={classes.tiles}>*/}
      <CourseTabs />
      <div className={styles.coursesContainer}>
        {response.data.map(
          (course: ICourse): ReactElement => (
            <Course key={course.id} data={course} />
          ),
        )}
      </div>
      {/*</motion.div>*/}
    </div>
  );
}
