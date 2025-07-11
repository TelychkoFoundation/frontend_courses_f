"use client";

import { ReactElement, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getAllAdminCourses } from "../../lib/getActions";
import Course from "./course";
import { ICourse } from "../../models/Course";

export default function CoursesList() {
  const [data, setData] = useState<ICourse[]>([]);

  // const response = await getAllAdminCourses("asc");
  //
  // console.log(response, "response");
  useEffect(() => {
    const b = async () => {
      const r = await getAllAdminCourses("asc");
      console.log(r, "r");
      setData(r.data);
    };

    b();
  }, []);

  console.log(data, "DATA");

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
