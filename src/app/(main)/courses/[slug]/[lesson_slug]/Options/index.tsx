"use client";

import { ReactElement, useState } from "react";
import Description from "./Description";
import Practice from "./Practice";
import Document from "./Document";
import Mentorship from "./Mentorship";
import { useLessons, useLessonDetails } from "@/hooks";
import styles from "./index.module.css";

export default function Options() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { currentLesson } = useLessons();
  const { isCurrentLessonPaid, isCurrentLessonCompleted, lessonProgress } =
    useLessonDetails(
      currentLesson?.lesson._id as string,
      currentLesson?.lesson.course_id as string,
      currentLesson?.lesson.video_duration,
    );

  const toggleAccordion = (index: number) => {
    if (!isCurrentLessonPaid) {
      return;
    }

    if (index === 1) {
      return;
    }

    setActiveIndex(index);
  };

  const options = [
    <Description
      key={0}
      isActive={activeIndex === 0}
      isCurrentLessonPaid={isCurrentLessonPaid}
      isCurrentLessonCompleted={isCurrentLessonCompleted}
      lessonProgress={lessonProgress}
    />,
    <Mentorship key={1} isCurrentLessonPaid={isCurrentLessonPaid} />,
    <Document
      key={2}
      isActive={activeIndex === 2}
      isCurrentLessonPaid={isCurrentLessonPaid}
    />,
    <Practice
      key={3}
      isActive={activeIndex === 3}
      isCurrentLessonPaid={isCurrentLessonPaid}
    />,
  ];

  return (
    <>
      {options.map((option: ReactElement, index: number) => (
        <div
          key={index}
          className={`${styles.currentLessonOption} ${
            index === activeIndex ? styles.active : ""
          } ${!isCurrentLessonPaid ? styles.disabled : ""}`}
          onClick={() => toggleAccordion(index)}
        >
          {option}
        </div>
      ))}
    </>
  );
}
