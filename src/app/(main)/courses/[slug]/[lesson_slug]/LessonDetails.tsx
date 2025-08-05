"use client";

import styles from "./page.module.css";
import { LuTableOfContents } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { ILesson } from "@/typings";
import { LuPanelRightClose } from "react-icons/lu";

interface ILessonDetailsProps {
  currentLesson: ILesson;
  setShowDetailsAction: (status: boolean) => void;
  showDetails: boolean;
}

export default function LessonDetails({
  currentLesson,
  setShowDetailsAction,
  showDetails,
}: ILessonDetailsProps) {
  const router = useRouter();

  const redirectToLessons = () => {
    router.back();
  };

  return (
    <div
      className={`${styles.lessonDetails} ${!showDetails ? styles.hidden : ""}`}
    >
      {/*<div className={styles.lessonDetailsHeader}>*/}
      {/*  <h2 className={styles.lessonTitle}>{"currentLesson"}</h2>*/}
      {/*  <LuTableOfContents size={20} onClick={redirectToLessons} />*/}
      {/*</div>*/}
      {/*<div className={`${styles.lessonItem} ${styles.active}`}>*/}
      {/*  <span className={styles.lessonTitle}>{currentLesson.title}</span>*/}
      {/*  <span className={styles.lessonNumber}>08:12</span>*/}
      {/*</div>*/}
      <LuPanelRightClose
        size={30}
        onClick={() => setShowDetailsAction(!showDetails)}
      />
      <pre>{JSON.stringify(currentLesson, null, 2)}</pre>
    </div>
  );
}
