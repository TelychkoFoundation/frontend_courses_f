"use client";

import { QueryDrawerType, ILesson } from "@/typings";
import { Drawer, LessonSkeleton } from "@/components";
import { Lesson } from "./Lesson";
import { useCourses, useLessons } from "@/hooks";
import LessonsHeader from "./LessonsHeader";
import CourseContentDrawer from "./CourseContentDrawer";
import styles from "./page.module.css";

export default function CoursePage() {
  const { allLessons } = useLessons();
  const { currentCourse } = useCourses();

  return (
    <>
      <LessonsHeader />
      <main className={styles.lessonsContainer}>
        {!allLessons
          ? Array.from({ length: 12 }).map((_, idx) => (
              <LessonSkeleton key={idx} />
            ))
          : allLessons.map((lesson: ILesson, index: number) => (
              <Lesson key={index} index={index} lesson={lesson} />
            ))}
      </main>
      <Drawer
        title={currentCourse?.title}
        drawerID={QueryDrawerType.CourseContentsDrawer}
      >
        <CourseContentDrawer />
      </Drawer>
    </>
  );
}
