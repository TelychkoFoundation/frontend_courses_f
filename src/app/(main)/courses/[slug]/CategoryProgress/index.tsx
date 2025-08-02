import styles from "./index.module.css";

interface CategoryProgressProps {
  totalSeconds: number;
  watchedSeconds: number;
  label: string;
}

export const CategoryProgress = ({
  totalSeconds = 3000,
  watchedSeconds = 1400,
  label,
}: CategoryProgressProps) => {
  const radius = 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = Math.min(watchedSeconds / totalSeconds, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className={styles.categoryProgress}>
      <div className={styles.svgWrapper}>
        <svg height="40" width="40">
          <circle
            stroke="#e0e0e0"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="20"
            cy="20"
          />
          <circle
            stroke="#4caf50"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="20"
            cy="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className={styles.progressText}>{Math.round(progress * 100)}%</div>
      </div>
      <span>{label}</span>
    </div>
  );
};
