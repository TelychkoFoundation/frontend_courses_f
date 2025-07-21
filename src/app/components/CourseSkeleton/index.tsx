import styles from "./index.module.css";

export default function CourseSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.icon} />
      <div className={styles.title} />
      <div className={styles.subtitle} />
    </div>
  );
}
