import { ReactNode } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LessonStatusBar } from "@/components";
import styles from "./index.module.css";

interface IContentItemProps {
  id: string;
  children: ReactNode;
}

export default function ContentItem({ id, children }: IContentItemProps) {
  const params = useParams();

  return (
    <Link href={`/courses/${params.slug}/${id}`}>
      <li className={styles.contentsListItem}>
        <div className={styles.contentsListLessonStatus}>
          <LessonStatusBar />
        </div>
        <span className={styles.contentsListItemText}>{children}</span>
      </li>
    </Link>
  );
}
