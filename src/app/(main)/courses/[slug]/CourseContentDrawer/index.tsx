"use client";

import styles from "./index.module.css";
import { useLessons } from "@/hooks";
import { useState } from "react";
import LessonDetailsDrawer from "../LessonDetailsDrawer";
import { CategoryProgress } from "../CategoryProgress";
import CourseProgress from "../CourseProgress";
import LessonFeedback from "../LessonFeedback";

export const lessons = [
  { id: "1", title: "Що таке HTML", duration: "3:20" },
  { id: "2", title: "Історія HTML і роль Тіма Бернерса-Лі", duration: "4:10" },
  { id: "3", title: "Як працює браузер і що таке DOM", duration: "5:00" },
  { id: "4", title: "Структура документа і коментарі", duration: "6:15" },
  { id: "5", title: "Заголовки, параграфи, переноси", duration: "4:50" },
  { id: "6", title: "Теги форматування тексту", duration: "7:40" },
  { id: "7", title: "Списки", duration: "7:40" },
  { id: "8", title: "Зображення", duration: "7:40" },
  { id: "9", title: "Посилання", duration: "7:40" },
  { id: "10", title: "Семантичні теги HTML5", duration: "7:40" },
  { id: "11", title: "Таблиці", duration: "7:40" },
  { id: "12", title: "Основи форм: структура", duration: "7:40" },
  { id: "13", title: "Типи полів та інші елементи форм", duration: "7:40" },
  { id: "14", title: "Валідація форм", duration: "7:40" },
  { id: "15", title: "Відео та аудіо", duration: "7:40" },
  { id: "16", title: "Іфрейми", duration: "7:40" },
  // { id: "17", title: "Основи форм: структура", duration: "7:40" },
  // { id: "18", title: "Основи форм: структура", duration: "7:40" },
];

const sections = [
  { title: "Розділ 1: Основи вебу та HTML", count: 4 },
  { title: "Розділ 2: Контентні теги", count: 5 },
  { title: "Розділ 3: Структура сторінки", count: 2 },
  { title: "Розділ 4: Форми", count: 3 },
  { title: "Розділ 5: Вбудований контент", count: 2 },
];

function groupLessons(lessons: any, sectionsInfo: any) {
  const result = [];
  let start = 0;

  for (const section of sectionsInfo) {
    const grouped = lessons.slice(start, start + section.count);
    result.push({
      title: section.title,
      icon: section.icon,
      lessons: grouped,
    });
    start += section.count;
  }

  return result;
}

export default function CourseContentDrawer() {
  const { currentLesson, setCurrentLesson } = useLessons();
  const [lessonCategory, setLessonCategory] = useState<string>("");

  console.log(currentLesson, "currentLesson");

  if (currentLesson) {
    return <LessonDetailsDrawer lessonCategory={lessonCategory} />;
  }

  let globalIndex = 1;
  const duration = 657;
  const watched = 120;
  const progressPercent = Math.min((watched / duration) * 100, 100);

  return (
    <div className={styles.container}>
      <LessonFeedback
        onSubmit={(rating, comment) => {
          console.log("Оцінка:", rating);
          console.log("Коментар:", comment);
          // TODO: надіслати на сервер
        }}
      />
      <CourseProgress
        watchedSeconds={600}
        totalSeconds={600}
        completedVideos={10}
        totalVideos={10}
      />
      {groupLessons(lessons, sections).map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>{" "}
            <CategoryProgress
              totalSeconds={3000}
              watchedSeconds={1900}
              label=""
            />
          </div>
          <ul className={styles.lessonList}>
            {section.lessons.map((lesson: any) => {
              // const isActive = lesson.id === currentLesson?.id;
              // const className = isActive
              //   ? `${styles.lessonItem} ${styles.active}`
              //   : styles.lessonItem;
              //
              // const currentNumber = globalIndex++;

              return (
                <li
                  key={lesson.id}
                  // className={className}
                  onClick={() => {
                    setCurrentLesson(lesson);
                    setLessonCategory(section.title);
                  }}
                >
                  <div className={styles.lessonItem}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className={styles.tooltip}>
                        Переглянуто: {watched}с
                      </div>
                    </div>
                    <div className={styles.lessonContent}>{lesson.title}</div>
                  </div>
                  {/*<span className={styles.lessonNumber}>{currentNumber}.</span>{" "}*/}
                  {/*<span className={styles.lessonTitle}>{lesson.title}</span>*/}
                  {/*<span className={styles.lessonNumber}>{lesson.duration}</span>*/}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
