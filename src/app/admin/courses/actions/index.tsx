"use client";

import styles from "./index.module.css";
import Link from "next/link";
import { useAdmin } from "@/hooks";
import { useParams, usePathname } from "next/navigation";
import {
  CoursesLinks,
  CourseLinks,
  NewCourseLinks,
  LessonsLinks,
  NewLessonLinks,
  LessonLinks,
} from "./links";
import {
  CourseCrumb,
  LessonsCrumbs,
  NewCourseCrumb,
  NewLessonCrumbs,
  LessonCrumbs,
} from "./crumbs";
import { CourseKeyTypes } from "@/typings";

export default function SubHeader() {
  const { currentCourse, currentLesson } = useAdmin();
  const params = useParams();
  const pathname = usePathname();

  const isLessonPage: boolean = !!params?.lesson_slug;
  const isCoursePage: boolean = !!params?.slug;
  const isNewCoursePage: boolean = pathname.endsWith("/new");
  const isLessonsPage: boolean = pathname.endsWith("/lessons");
  const isNewLessonsPage: boolean = pathname.endsWith("/lessons/new");

  const renderCrumbs = () => {
    if (isLessonPage) {
      return (
        <LessonCrumbs
          slug={params.slug as CourseKeyTypes}
          title={currentCourse?.title as string}
          lessonTitle={currentLesson?.title as string}
        />
      );
    }

    if (isNewLessonsPage) {
      return (
        <NewLessonCrumbs
          slug={params.slug as CourseKeyTypes}
          title={currentCourse?.title as string}
        />
      );
    }

    if (isLessonsPage) {
      return (
        <LessonsCrumbs
          slug={params.slug as CourseKeyTypes}
          title={currentCourse?.title as string}
        />
      );
    }
    if (isNewCoursePage) {
      return <NewCourseCrumb />;
    }

    if (isCoursePage) {
      return <CourseCrumb title={currentCourse?.title as string} />;
    }

    return null;
  };

  const renderLinks = () => {
    if (isLessonPage) {
      return <LessonLinks slug={params.slug as CourseKeyTypes} />;
    }

    if (isNewLessonsPage) {
      return <NewLessonLinks slug={params.slug as CourseKeyTypes} />;
    }

    if (isLessonsPage) {
      return <LessonsLinks slug={params.slug as CourseKeyTypes} />;
    }

    if (isNewCoursePage) {
      return <NewCourseLinks />;
    }

    if (isCoursePage) {
      return <CourseLinks slug={params.slug as CourseKeyTypes} />;
    }

    return <CoursesLinks />;
  };

  return (
    <div className={styles.subHeader}>
      <div className={styles.breadcrumbs}>
        <Link href="/admin/courses" className={styles.segment}>
          Курси
        </Link>
        {renderCrumbs()}
      </div>
      <div className={styles.links}>{renderLinks()}</div>
    </div>
  );
}
