import styles from "./index.module.css";

interface IPriceProps {
  currentCourseDetailsVisibility: boolean;
}

export default function Price({ currentCourseDetailsVisibility }: IPriceProps) {
  return (
    <div className={styles.coursePriceCertificateButtonInner}>
      <div
        className={`${styles.coursePriceCertificateCurrent} ${currentCourseDetailsVisibility ? styles.open : ""}`}
      >
        <span className={styles.coursePriceCertificateCurrentPrice}>499</span>
        <span className={styles.coursePriceCertificateCurrency}>грн</span>
      </div>
      <span
        className={`${styles.coursePriceCertificateOldPrice} ${currentCourseDetailsVisibility ? styles.open : ""}`}
      >
        758 грн
      </span>
    </div>
  );
}
