import { ReactNode } from "react";
import Link from "next/link";
import { useLessonDetails } from "@/hooks";
import { useParams } from "next/navigation";
import { LessonStatusBar } from "@/components";
import styles from "./index.module.css";

interface IContentItemProps {
  lessonId: string;
  courseId: string;
  children: ReactNode;
  videoDuration: number;
}

export default function ContentItem({
  lessonId,
  courseId,
  children,
  videoDuration,
}: IContentItemProps) {
  const params = useParams();
  const { isCurrentLessonPaid, isCurrentLessonCompleted, lessonProgress } =
    useLessonDetails(lessonId, courseId, videoDuration);

  return (
    <Link
      href={`/courses/${params.slug}/${lessonId}`}
      onClick={event => event.stopPropagation()}
    >
      <li className={styles.contentsListItem}>
        <div className={styles.contentsListLessonStatus}>
          <LessonStatusBar
            isCurrentLessonPaid={isCurrentLessonPaid}
            isCurrentLessonCompleted={isCurrentLessonCompleted}
            lessonProgress={lessonProgress}
          />
        </div>
        <span className={styles.contentsListItemText}>{children}</span>
      </li>
    </Link>
  );
}
