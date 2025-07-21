import styles from "../page.module.css";
import { isNewCourse } from "../../../utils";

interface CourseStatusProps {
  is_published: boolean;
  updatedAt: Date;
}

export const CourseStatus = ({
  is_published,
  updatedAt,
}: CourseStatusProps) => {
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
