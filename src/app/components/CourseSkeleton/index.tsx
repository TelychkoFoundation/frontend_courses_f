import styles from "./index.module.css";

export default function CourseSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className={styles.icon} />
      <div className={styles.title} />
      <div className={styles.subtitle} />
    </div>
  );
}
