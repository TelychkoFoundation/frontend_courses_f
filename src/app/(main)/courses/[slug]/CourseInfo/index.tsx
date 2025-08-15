"use client";

import { memo } from "react";
import { Badge, BadgeType } from "@/components";
import { useCourses } from "@/hooks";
import styles from "./index.module.css";
import MainInfo from "./MainInfo";
import Toggle from "./Toggle";

export default memo(function CourseInfo() {
  const { currentCourse, currentCourseDetailsVisibility } = useCourses();

  if (!currentCourseDetailsVisibility) {
    return (
      <div className={styles.courseInfoContainer}>
        <MainInfo />
        <Toggle />
      </div>
    );
  }

  return (
    <div className={styles.courseInfoContainerOpen}>
      <p className={styles.courseInfoSectionDescription}>
        {currentCourse?.description}
      </p>
      <Toggle />
      <div className={styles.courseInfoSectionOpen}>
        <p>Чому навчитесь</p>
        <span>{currentCourse?.outcomes}</span>
      </div>
      <div className={styles.courseInfoSectionOpen}>
        <p>Що потрібно знати перед початком</p>
        <span>{currentCourse?.prerequisites}</span>
      </div>
      <div className={styles.courseInfoSectionTagsOpen}>
        <p>Категорії</p>
        <section>
          {currentCourse?.categories?.base?.map(
            (category: string, index: number) => (
              <Badge type={BadgeType.Tag} key={index}>
                <span className={styles.badgeText}>{category}</span>
              </Badge>
            ),
          )}
        </section>
      </div>
      <MainInfo />
    </div>
  );
});
