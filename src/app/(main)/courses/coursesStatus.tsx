import styles from "./page.module.css";
import { isNewCourse } from "../../utils";
import { FC } from "react";

interface CourseStatusProps {
  is_published: boolean;
  updatedAt: Date;
}

export const CourseStatus: FC<CourseStatusProps> = ({
  is_published,
  updatedAt,
}) => {
  if (!is_published) {
    return (
      <span className={`${styles.badge} ${styles.isInProgress}`}>
        У процесі
      </span>
    );
  }

  if (isNewCourse(updatedAt)) {
    return <span className={`${styles.badge} ${styles.isNew}`}>Новий</span>;
  }

  return (
    <span className={`${styles.badge} ${styles.isAvailable}`}>Доступний</span>
  );
};
