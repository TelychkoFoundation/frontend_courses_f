"use client";

import styles from "../page.module.css";
import { MdOutlineInfo } from "react-icons/md";
import { FC, MouseEvent } from "react";
import { useCourses, useDrawer } from "@/hooks";
import { CourseKeyTypes, QueryDrawerType } from "@/typings";
import { getCurrentCourse } from "@/lib";

interface CoursesInfoProps {
  is_published: boolean;
  courseKey: CourseKeyTypes;
}

export const Info: FC<CoursesInfoProps> = ({ is_published, courseKey }) => {
  const { openDrawerWithQueryString } = useDrawer();
  const { setCurrentCourse } = useCourses();

  const showCourseInfo = async (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const response = await getCurrentCourse(courseKey);

    if (response.success) {
      setCurrentCourse(response.data);
      openDrawerWithQueryString(QueryDrawerType.CourseDetailsDrawer, courseKey);
    }
  };

  if (is_published) {
    return (
      <div onClick={showCourseInfo} className={styles.info}>
        <MdOutlineInfo size={20} />
      </div>
    );
  }

  return <p className={styles.waiting}>🕒&nbsp;&nbsp; Старт 20 серпня</p>;
};
