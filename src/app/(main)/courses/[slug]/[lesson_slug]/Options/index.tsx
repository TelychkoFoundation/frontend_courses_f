"use client";

import { ReactElement, useState } from "react";
import Description from "./Description";
import Practice from "./Practice";
import Document from "./Document";
import Mentorship from "./Mentorship";
import { useLessons } from "@/hooks";
import styles from "./index.module.css";

export default function Options() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const { isCurrentLessonPaid } = useLessons();

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
    <Description key={0} isActive={activeIndex === 0} />,
    <Mentorship key={1} />,
    <Document key={2} isActive={activeIndex === 2} />,
    <Practice key={3} isActive={activeIndex === 3} />,
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
