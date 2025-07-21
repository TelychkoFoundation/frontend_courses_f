import { ReactElement, Suspense } from "react";
import styles from "./page.module.css";
import { getAllCourses } from "@/lib";
import Item from "./course/item";
import { ICourse } from "@/typings";
import { CourseSkeleton } from "@/components";

export default async function List() {
  const response = await getAllCourses();

  return (
    <Suspense
      fallback={Array.from({ length: 10 }).map((_, idx) => (
        <CourseSkeleton key={idx} />
      ))}
    >
      <div className={styles.coursesContainer}>
        {response.data
          ? response.data.map(
              (course: ICourse): ReactElement => (
                <Item key={course.id} course={course} />
              ),
            )
          : Array.from({ length: 10 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))}
      </div>
    </Suspense>
  );
}
