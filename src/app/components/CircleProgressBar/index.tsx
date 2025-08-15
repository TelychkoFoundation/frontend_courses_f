import styles from "./index.module.css";

interface CircleProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircleProgressBar({
  progress,
  size = 20,
  strokeWidth = 3,
}: CircleProgressProps) {
  const radius: number = (size - strokeWidth) / 2;
  const circumference: number = 2 * Math.PI * radius;

  const offset: number = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.wrapper}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={styles.primaryCircle}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset.toString()}
          className={styles.secondaryCircle}
        />
      </svg>
      <span className={`${styles.text} ${progress > 0 ? styles.coloured : ""}`}>
        {progress}%
      </span>
    </div>
  );
}
