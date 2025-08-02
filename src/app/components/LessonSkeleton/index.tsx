import styles from "./index.module.css";

export default function CourseSkeleton() {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoSkeleton} />
      <div className={styles.lessonSkeleton}>
        <div className={styles.skeletonTitle}></div>

        <div className={styles.skeletonFooter}>
          <div className={styles.skeletonXP}></div>
          <div className={styles.skeletonViews}></div>
        </div>
      </div>
    </div>
  );
}
