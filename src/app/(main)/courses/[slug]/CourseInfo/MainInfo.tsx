import { transformDate } from "@/utils";
import { useMemo, memo } from "react";
import { CourseDifficultyType, IMyCourses } from "@/typings";
import { Badge, BadgeSize, BadgeType, LinearProgressBar } from "@/components";
import { useCourses, useUser } from "@/hooks";
import styles from "./index.module.css";

export default memo(function MainInfo() {
  const { currentCourse } = useCourses();
  const { user } = useUser();

  const hasStarted: boolean = useMemo(() => {
    if (!user) {
      return false;
    }

    if (!user.my_courses?.length) {
      return false;
    }

    if (!currentCourse) {
      return false;
    }

    return user.my_courses.some(
      (myCourse: IMyCourses): boolean =>
        myCourse.course_id === currentCourse._id,
    );
  }, [user, currentCourse]);

  const courseProgress: IMyCourses | null | undefined = useMemo(() => {
    if (!user) {
      return null;
    }

    if (!user.my_courses?.length) {
      return null;
    }

    if (!currentCourse) {
      return null;
    }

    return user.my_courses.find(
      (myCourse: IMyCourses): boolean =>
        myCourse.course_id === currentCourse._id,
    );
  }, [user, currentCourse]);

  const renderDifficulty = useMemo(() => {
    if (!currentCourse) {
      return null;
    }

    if (currentCourse.difficulty === CourseDifficultyType.Beginner) {
      return (
        <Badge type={BadgeType.Basic} size={BadgeSize.Large}>
          базовий
        </Badge>
      );
    }

    if (currentCourse.difficulty === CourseDifficultyType.Intermediate) {
      return (
        <Badge type={BadgeType.Advanced} size={BadgeSize.Large}>
          просунутий
        </Badge>
      );
    }

    return (
      <Badge type={BadgeType.Professional} size={BadgeSize.Large}>
        професійний
      </Badge>
    );
  }, [currentCourse]);

  const renderCourseProgress = useMemo(() => {
    if (!hasStarted) {
      return (
        <Badge type={BadgeType.NotStarted} size={BadgeSize.Large}>
          не розпочато
        </Badge>
      );
    }

    if (!courseProgress) {
      return null;
    }

    if (courseProgress.status === "in_progress") {
      return <LinearProgressBar message="14 з 20 уроків переглянуто" />;
    }

    if (courseProgress.status === "completed") {
      return <p>завершено 19.12.2025</p>;
    }

    return null;
  }, [hasStarted, courseProgress]);

  return (
    <>
      <div className={styles.courseInfoSection}>
        <p className={styles.courseInfoSectionTitle}>Прогрес курсу</p>
        {renderCourseProgress}
      </div>
      <div className={styles.courseInfoSection}>
        <p className={styles.courseInfoSectionTitle}>складність</p>
        {renderDifficulty}
      </div>
      <div className={styles.courseInfoSection}>
        <p className={styles.courseInfoSectionTitle}>опубліковано</p>
        <p className={styles.courseInfoSectionTitle}>
          {currentCourse
            ? transformDate(currentCourse.updatedAt as unknown as string)
            : null}
        </p>
      </div>
    </>
  );
});
