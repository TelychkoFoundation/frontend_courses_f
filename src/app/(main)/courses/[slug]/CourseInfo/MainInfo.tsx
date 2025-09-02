import { transformDate } from "@/utils";
import { useMemo, memo } from "react";
import { CourseDifficultyType, ICourse, IMyCourses } from "@/typings";
import { Badge, BadgeSize, BadgeType, LinearProgressBar } from "@/components";
import {
  useCourses,
  useDeviceType,
  DeviceType,
  DeviceTypes,
  useCourseDetails,
} from "@/hooks";
import styles from "./index.module.css";

export default memo(function MainInfo() {
  const { currentCourse } = useCourses();
  const deviceType: DeviceType = useDeviceType();
  const { completedLessons, courseProgress, courseDetails } = useCourseDetails(
    currentCourse as ICourse,
  );

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
    if (!courseDetails.hasStarted) {
      return (
        <Badge type={BadgeType.NotStarted} size={BadgeSize.Large}>
          не розпочато
        </Badge>
      );
    }

    if (!courseDetails) {
      return null;
    }

    if (courseDetails.status === "in_progress") {
      return (
        <LinearProgressBar
          message={`${completedLessons} з ${currentCourse?.lessons.length} уроків переглянуто`}
          progress={courseProgress}
        />
      );
    }

    if (courseDetails.status === "completed") {
      return <p>завершено 19.12.2025</p>;
    }

    return null;
  }, [courseDetails.hasStarted, courseDetails]);

  if (deviceType === DeviceTypes.mobile) {
    return (
      <>
        <section className={styles.courseInfoSectionContainer}>
          <div className={styles.courseInfoSection}>
            <p className={styles.courseInfoSectionTitle}>Прогрес курсу</p>
            {renderCourseProgress}
          </div>
          <div className={styles.courseInfoSection}>
            <p className={styles.courseInfoSectionTitle}>складність</p>
            {renderDifficulty}
          </div>
        </section>
        <p>{currentCourse?.description}</p>
      </>
    );
  }

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
