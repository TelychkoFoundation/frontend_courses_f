import { useLessons } from "@/hooks";
import LessonShortInfo from "../../LessonShortInfo";
import styles from "./index.module.css";

interface IDescriptionProps {
  isActive: boolean;
  isCurrentLessonPaid: boolean;
  isCurrentLessonCompleted: boolean;
  lessonProgress: number;
}

export default function Description({
  isActive,
  isCurrentLessonPaid,
  isCurrentLessonCompleted,
  lessonProgress,
}: IDescriptionProps) {
  const { currentLesson } = useLessons();

  return (
    <>
      <section className={styles.descriptionContainer}>
        <h3
          className={
            isActive
              ? styles.descriptionTitle
              : styles.descriptionTitleCollapsed
          }
        >
          {currentLesson?.lesson.title}
        </h3>
        <LessonShortInfo
          xp_reward={currentLesson?.lesson.xp_reward as number}
          views={currentLesson?.lesson.views as number}
          isCurrentLessonPaid={isCurrentLessonPaid}
          isCurrentLessonCompleted={isCurrentLessonCompleted}
          lessonProgress={lessonProgress}
        />
      </section>
      {isActive ? (
        <p className={styles.descriptionContent}>
          {currentLesson?.lesson.description}
        </p>
      ) : null}
      {isActive && isCurrentLessonPaid ? (
        <p className={styles.feedback}>Залишити відгук</p>
      ) : null}
    </>
  );
}
