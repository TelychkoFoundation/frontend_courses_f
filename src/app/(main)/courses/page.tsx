import CourseList from "./CourseList";
import styles from "./page.module.css";

export default async function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.ellipse} />
      <CourseList />
    </div>
  );
}
