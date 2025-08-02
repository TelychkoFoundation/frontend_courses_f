import styles from "./index.module.css";

interface CourseProgressProps {
  watchedSeconds: number;
  totalSeconds: number;
  completedVideos: number;
  totalVideos: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function CourseProgress({
  watchedSeconds,
  totalSeconds,
  completedVideos,
  totalVideos,
}: CourseProgressProps) {
  const progress = Math.min(watchedSeconds / totalSeconds, 1);

  const getColor = () => {
    if (progress < 0.33) return "#f44336"; // Red
    if (progress < 0.66) return "#ff9800"; // Orange
    return "#4caf50"; // Green
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>Прогрес курсу</span>
        <span>
          ⏱ {formatTime(watchedSeconds)} з {formatTime(totalSeconds)}
        </span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${progress * 100}%`,
            backgroundColor: getColor(),
          }}
        />
      </div>
      <div className={styles.status}>
        📼 {completedVideos} з {totalVideos} уроків переглянуто
        {progress > 0.9 && (
          <span className={styles.congrats}> 🎉 Молодець!</span>
        )}
      </div>
    </div>
  );
}
