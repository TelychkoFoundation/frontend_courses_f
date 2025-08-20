"use client";

import { getAllCourses } from "@/actions";
import { ICourse } from "@/typings";
import styles from "./index.module.css";
import { ReactElement, useState, useEffect } from "react";
import { isNewCourse } from "@/utils";
import { NewCourseShadow } from "@/images";
import { Logo } from "../../(main)/courses/Logo";
import { Badge, BadgeType } from "@/components";

export default function Courses() {
  const [courseHoveredID, setCourseHoveredID] = useState<string | null>(null);
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { success, data } = await getAllCourses();

      if (success) setCourses(data);
    };

    fetchCourses();
  }, []);

  const renderShadow = (updatedAt: Date): ReactElement | null => {
    if (isNewCourse(updatedAt)) {
      return <NewCourseShadow className={styles.newCourseShadow} />;
    }

    return null;
  };

  const renderBadge = (updatedAt: Date): ReactElement | null => {
    if (isNewCourse(updatedAt)) {
      return <Badge type={BadgeType.New}>новий</Badge>;
    }

    return null;
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Курси</h2>
      <section className={styles.carousel}>
        {courses.map((course: ICourse) => (
          <div
            key={course._id as string}
            className={styles.course}
            onMouseEnter={() => setCourseHoveredID(course._id as string)}
            onMouseLeave={() => setCourseHoveredID(null)}
          >
            <div className={styles.badge}>{renderBadge(course.updatedAt)}</div>
            <Logo
              courseKey={course.courseKey}
              courseHovered={courseHoveredID === course._id}
            />
            {renderShadow(course.updatedAt)}
            <div className={styles.courseTitles}>
              <h3>{course.title}</h3>
              <p className={styles.description}>{course.short_description}</p>
            </div>
            <div className={styles.footer} />
          </div>
        ))}
      </section>
    </section>
  );
}
