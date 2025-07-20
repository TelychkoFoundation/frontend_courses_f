"use client";

import styles from "./index.module.css";
import { CourseDifficultyType, ICourse } from "@/typings";
import { CategoryDisplayMap } from "@/constants";
import { useRouter } from "next/navigation";

export default function CourseDetailDrawerContent({
  currentCourse,
}: {
  currentCourse: ICourse;
}) {
  const router = useRouter();

  if (!currentCourse) return null;

  const setDifficultyBadge = (difficulty: CourseDifficultyType) => {
    switch (difficulty) {
      case CourseDifficultyType.Beginner:
        return "🔰 Початковий";
      case CourseDifficultyType.Intermediate:
        return "🧭 Середній";
      default:
        return "🚀 Просунутий";
    }
  };

  return (
    <div className={styles.content}>
      <p>{currentCourse.description}</p>

      {currentCourse.difficulty && (
        <div className={styles.section}>
          <h4>Рівень складності</h4>
          <div
            className={`${styles.difficultyBadge} ${styles[currentCourse.difficulty.toLowerCase()]}`}
          >
            {setDifficultyBadge(currentCourse.difficulty)}
          </div>
        </div>
      )}

      {currentCourse.prerequisites && (
        <div>
          <h4>Що потрібно знати перед початком курсу</h4>
          <p>{currentCourse.prerequisites}</p>
        </div>
      )}

      {currentCourse.outcomes && (
        <div>
          <h4>Чому навчитесь</h4>
          <p>{currentCourse.outcomes}</p>
        </div>
      )}

      {currentCourse.categories && (
        <div className={styles.section}>
          <h4>Категорії</h4>
          <div className={styles.categoryGroups}>
            {Object.entries(currentCourse.categories).map(
              ([groupName, items]) => (
                <div key={groupName} className={styles.categoryGroup}>
                  <div className={styles.tagsWrapper}>
                    {items.map((item: string) => (
                      <span key={item} className={styles.tag}>
                        {CategoryDisplayMap[item]}
                      </span>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
      <div className={styles.actions}>
        <button
          className={styles.startBtn}
          onClick={() => router.push(`/courses/${currentCourse.id}`)}
        >
          Почати
        </button>
      </div>
    </div>
  );
}
