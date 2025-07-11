"use client";

import { ReactElement, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";

export default function CoursesList() {
  const [data, setData] = useState<ICourse[]>([]);

  useEffect(() => {
    const getAllAdminCoursesHandler = async () => {
      const response = await getAllAdminCourses("asc");

      if (response.success) {
        setData(response.data);
      }
    };

    getAllAdminCoursesHandler();
  }, []);

  return (
    <div className={styles.coursesContainer}>
      {data.map(
        (course: ICourse): ReactElement => (
          <Course key={course.id} data={course} />
        ),
      )}
    </div>
  );
}
