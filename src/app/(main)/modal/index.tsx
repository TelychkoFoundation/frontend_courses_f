"use client";

import { useEffect } from "react";
import { ICourse } from "../../models/Course";
import styles from "./modal.module.css";
import { useGlobal } from "../../hooks/useGlobal";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CourseDifficultyType } from "../../typings/course";
import { CategoryDisplayMap } from "../../constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createQueryString } from "../../utils";

export default function CourseDetailModal() {
  const { activeCourse, setActiveCourse } = useGlobal();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCourse(null);
      }
    };

    if (activeCourse) {
      const newQuery = createQueryString(
        "course",
        activeCourse.courseKey,
        searchParams.toString(),
      );
      router.push(pathname + "?" + newQuery);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("course");
      router.push(
        pathname + (params.toString() ? "?" + params.toString() : ""),
      );
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCourse]);

  if (!activeCourse) return null;

  const {
    title,
    description,
    categories,
    difficulty,
    prerequisites,
    outcomes,
  } = activeCourse as ICourse;

  const onClose = () => {
    setActiveCourse(null);
  };

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

  const onStart = () => {
    router.push(`/courses/${activeCourse.id}`);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className={styles.content}>
          <p>{description}</p>

          {difficulty && (
            <div className={styles.section}>
              <h4>Рівень складності</h4>
              <div
                className={`${styles.difficultyBadge} ${styles[difficulty.toLowerCase()]}`}
              >
                {setDifficultyBadge(difficulty)}
              </div>
            </div>
          )}

          {prerequisites && (
            <div>
              <h4>Що потрібно знати перед початком курсу</h4>
              <p>{prerequisites}</p>
            </div>
          )}

          {outcomes && (
            <div>
              <h4>Чому навчитесь</h4>
              <p>{outcomes}</p>
            </div>
          )}

          {categories && (
            <div className={styles.section}>
              <h4>Категорії</h4>
              <div className={styles.categoryGroups}>
                {Object.entries(categories).map(([groupName, items]) => (
                  <div key={groupName} className={styles.categoryGroup}>
                    <div className={styles.tagsWrapper}>
                      {items.map((item: string) => (
                        <span key={item} className={styles.tag}>
                          {CategoryDisplayMap[item]}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <button className={styles.startBtn} onClick={onStart}>
            Почати
          </button>
        </div>
      </div>
    </div>
  );
}
