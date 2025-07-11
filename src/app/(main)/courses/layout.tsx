import styles from "./layout.module.css";
import { CoursesHeader } from "./header";

export default function AdminCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <CoursesHeader />
      {children}
    </div>
  );
}
