import styles from "../index.module.css";

export default function CourseCrumb({ title }: { title: string }) {
  return (
    <>
      <p className={styles.lastSegment}>{title}</p>
    </>
  );
}
