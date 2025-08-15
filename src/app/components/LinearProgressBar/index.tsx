import styles from "./index.module.css";

interface ILinearProgressBarProps {
  message?: string;
}

export default function LinearProgressBar({
  message,
}: ILinearProgressBarProps) {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="12"
        viewBox="0 0 256 12"
        fill="none"
      >
        <rect x="0.5" y="0.5" width="255" height="11" rx="5.5" fill="white" />
        <rect
          x="0.5"
          y="0.5"
          width="255"
          height="11"
          rx="5.5"
          className={styles.border}
        />
        <rect
          x="3"
          y="3"
          width="121" // !!!
          height="6"
          rx="3"
          className={styles.progress}
        />
      </svg>
      {message ? <p className={styles.message}>{message}</p> : null}
    </div>
  );
}
