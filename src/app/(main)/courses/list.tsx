import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllCourses } from "@/lib";
import Item from "./course/item";
import { ICourse } from "@/typings";
import { CourseSkeleton } from "@/components";

export default async function List() {
  const response = await getAllCourses();

  const renderList = () => {
    if (response?.success) {
      if (response.data.length) {
        return response.data.map(
          (course: ICourse): ReactElement => (
            <Item key={course.id} course={course} />
          ),
        );
      }

      return <p>No courses ...</p>;
    }

    return Array.from({ length: 10 }).map((_, idx) => (
      <CourseSkeleton key={idx} />
    ));
  };

  return <div className={styles.coursesContainer}>{renderList()}</div>;
}
