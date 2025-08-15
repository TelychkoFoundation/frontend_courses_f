import { memo } from "react";
import { Button, ButtonType } from "@/components";
import { useCourses } from "@/hooks";
import styles from "./index.module.css";

export default memo(function Toggle() {
  const { currentCourseDetailsVisibility, setCurrentCourseDetailsVisibility } =
    useCourses();

  const moreDetailsHandler = () => {
    setCurrentCourseDetailsVisibility(!currentCourseDetailsVisibility);
  };

  return (
    <section
      className={`${styles.courseInfoSectionButton} ${currentCourseDetailsVisibility ? styles.open : ""}`}
    >
      <Button type={ButtonType.OUTLINE} onClick={moreDetailsHandler}>
        {currentCourseDetailsVisibility ? "Приховати деталі" : "Деталі курсу"}
      </Button>
    </section>
  );
});
