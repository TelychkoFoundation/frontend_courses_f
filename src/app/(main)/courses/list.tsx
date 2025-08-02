import { ReactElement } from "react";
import styles from "./page.module.css";
import { getAllCourses, getMyCourses } from "@/actions";
import Item from "./course/item";
import { ICourse } from "@/typings";
import { CourseSkeleton } from "@/components";
import { NoCourses } from "./NoCourses";

export default async function List({ filter }: { filter: string }) {
  const response =
    filter === "all" ? await getAllCourses() : await getMyCourses();

  const renderList = () => {
    if (response?.success) {
      if (response.data.length) {
        return response.data.map(
          (course: ICourse): ReactElement => (
            <Item key={course.id} course={course} />
          ),
        );
      }

      return <NoCourses />;
    }

    return Array.from({ length: 10 }).map((_, idx) => (
      <CourseSkeleton key={idx} />
    ));
  };

  return <div className={styles.coursesContainer}>{renderList()}</div>;
}
