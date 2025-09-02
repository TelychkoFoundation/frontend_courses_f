import { DoneIcon, ExitIcon, LockIcon } from "@/images";
import { Badge, BadgeType, CircleProgressBar } from "@/components";
import Image from "next/image";
import { useLessonDetails } from "@/hooks";
import styles from "./index.module.css";

interface IPaginationItemProps {
  redirect: () => void;
  lessonId: string;
  courseId: string;
  title: string;
  lastTitle: string;
  videoDuration: number;
}

export default function PaginationItem({
  redirect,
  lessonId,
  courseId,
  title,
  lastTitle,
  videoDuration,
}: IPaginationItemProps) {
  const { isCurrentLessonPaid, isCurrentLessonCompleted, lessonProgress } =
    useLessonDetails(lessonId, courseId, videoDuration as number);

  const renderStatusIcon = () => {
    if (!isCurrentLessonPaid) {
      return <Badge type={BadgeType.New}>46 грн</Badge>;
    }

    if (isCurrentLessonCompleted) {
      return <Image src={DoneIcon} alt="Done Icon" />;
    }

    return <CircleProgressBar progress={lessonProgress} />;
    // return <span className={styles.inDev}>в розробці</span>;
  };

  const renderLockIcon = () => {
    return <LockIcon className={styles.lockIcon} />;
  };

  return (
    <section className={styles.paginationSection} onClick={redirect}>
      <span className={styles.title}>{title}</span>
      <div className={styles.description}>
        <div className={styles.descriptionInner}>
          <div>
            {!lessonId ? (
              <ExitIcon className={styles.exitIcon} />
            ) : (
              renderLockIcon()
            )}
          </div>
          &nbsp;&nbsp;
          <span>{lastTitle}</span>
        </div>
        &nbsp;&nbsp;
        <span>{!lessonId ? null : renderStatusIcon()}</span>
      </div>
    </section>
  );
}
