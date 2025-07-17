"use client";

import { useEffect, useState } from "react";
import { ICourse } from "../../models/Course";
import styles from "./modal.module.css";
import { useGlobal } from "../../hooks/useGlobal";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CourseDifficultyType } from "../../typings/course";
import { CategoryDisplayMap } from "../../constants";
import { useSearchParams, useRouter } from "next/navigation";
import { ModalType } from "../../typings/modals";
import { useQuery } from "../../hooks/useQuery";
import { getCurrentCourse } from "../../lib/getActions";
import { useEscape } from "../../hooks/useEscape";

export default function CourseDetailModal() {
  const { activeCourseModalOpen, setActiveCourseModalOpen } = useGlobal();
  const searchParams = useSearchParams();
  const { removeQueryString } = useQuery();
  const router = useRouter();

  const [course, setCourse] = useState<ICourse | null>(null);

  const queryValue: string | null = searchParams.get(
    ModalType.CourseDetailsModal,
  );

  const onClose = () => {
    setActiveCourseModalOpen(false);
    removeQueryString(ModalType.CourseDetailsModal);
  };

  useEscape(onClose);

  useEffect(() => {
    if (queryValue && activeCourseModalOpen) {
      const fetchCurrentCourse = async () => {
        const response = await getCurrentCourse(queryValue);

        if (response.success) {
          setCourse(response.data);
        }
      };

      fetchCurrentCourse();
      document.body.style.overflowX = "";
    }
  }, [activeCourseModalOpen, queryValue]);

  if (!activeCourseModalOpen) return null;
  if (!course) return null;

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
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{course.title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <IoMdCloseCircleOutline />
          </button>
        </div>

        <div className={styles.content}>
          <p>{course.description}</p>

          {course.difficulty && (
            <div className={styles.section}>
              <h4>Рівень складності</h4>
              <div
                className={`${styles.difficultyBadge} ${styles[course.difficulty.toLowerCase()]}`}
              >
                {setDifficultyBadge(course.difficulty)}
              </div>
            </div>
          )}

          {course.prerequisites && (
            <div>
              <h4>Що потрібно знати перед початком курсу</h4>
              <p>{course.prerequisites}</p>
            </div>
          )}

          {course.outcomes && (
            <div>
              <h4>Чому навчитесь</h4>
              <p>{course.outcomes}</p>
            </div>
          )}

          {course.categories && (
            <div className={styles.section}>
              <h4>Категорії</h4>
              <div className={styles.categoryGroups}>
                {Object.entries(course.categories).map(([groupName, items]) => (
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
          <button
            className={styles.startBtn}
            onClick={() => router.push(`/courses/${course.id}`)}
          >
            Почати
          </button>
        </div>
      </div>
    </div>
  );
}
