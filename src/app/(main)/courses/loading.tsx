import { CourseSkeleton } from "@/components";
import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.courses}>
      {Array.from({ length: 10 }).map((_, idx) => (
        <CourseSkeleton key={idx} className={styles.course} />
      ))}
    </div>
  );
}
