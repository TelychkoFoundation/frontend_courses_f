import { CircleDoneIcon, CircleLockIcon, DoneIcon, LockIcon } from "@/images";
import Image from "next/image";
import { CirclePlay } from "../index";
import styles from "./index.module.css";

interface ILessonStatusBarProps {
  isCurrentLessonPaid: boolean;
  isCurrentLessonCompleted: boolean;
  lessonProgress: number;
}

export default function LessonStatusBar({
  isCurrentLessonPaid,
  isCurrentLessonCompleted,
  lessonProgress,
}: ILessonStatusBarProps) {
  if (isCurrentLessonCompleted) {
    return (
      <>
        <CircleDoneIcon className={styles.doneContainer} />
        <Image src={DoneIcon} alt="Done icon" className={styles.lockPosition} />
      </>
    );
  }

  if (!isCurrentLessonPaid) {
    return (
      <>
        <CircleLockIcon className={styles.lockContainer} />
        <LockIcon
          positionClassname={styles.lockPosition}
          className={styles.lock}
        />
      </>
    );
  }

  return <CirclePlay progress={lessonProgress} />;
}
