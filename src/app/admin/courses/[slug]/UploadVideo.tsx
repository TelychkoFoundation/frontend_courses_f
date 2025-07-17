import styles from "../course.module.css";

export default async function UploadVideo() {
  return (
    <div className={styles.form}>
      <button type="button" className={styles.submit}>
        Завантажити відео
      </button>
    </div>
  );
}
