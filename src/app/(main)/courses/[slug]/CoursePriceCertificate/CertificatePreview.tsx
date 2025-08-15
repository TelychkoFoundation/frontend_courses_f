import styles from "./index.module.css";

interface ICertificatePreviewProps {
  currentCourseDetailsVisibility: boolean;
}

export default function CertificatePreview({
  currentCourseDetailsVisibility,
}: ICertificatePreviewProps) {
  return (
    <>
      <span className={styles.certificatePreviewContent}>
        Завершіть всі уроки курсу та здайте iспит щоб отримати сертифікат.
      </span>
      {currentCourseDetailsVisibility ? (
        <div className={styles.certificateContainer} />
      ) : null}
    </>
  );
}
