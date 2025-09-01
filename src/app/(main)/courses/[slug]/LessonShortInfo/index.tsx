import { Badge, BadgeType, CircleProgressBar } from "@/components";
import Image from "next/image";
import { DoneIcon } from "@/images";
import styles from "./index.module.css";

const inDev = false;

interface ILessonShortInfoProps {
  xp_reward: number;
  views: number;
  isCurrentLessonPaid: boolean;
  isCurrentLessonCompleted: boolean;
}

export default function LessonShortInfo({
  xp_reward,
  views,
  isCurrentLessonPaid,
  isCurrentLessonCompleted,
}: ILessonShortInfoProps) {
  const renderViews = (views: number): string => {
    if (inDev) {
      return "в розробці";
    }

    return `${views || 0} views`;
  };

  const renderStatus = () => {
    if (!isCurrentLessonPaid) {
      return;
    }

    if (isCurrentLessonCompleted) {
      return <Image src={DoneIcon} alt="Done Icon" />;
    }

    return <CircleProgressBar progress={0} />;
  };

  return (
    <section className={styles.container}>
      <Badge
        type={isCurrentLessonCompleted ? BadgeType.Done : BadgeType.NotStarted}
      >
        +{xp_reward}XP
      </Badge>
      <span className={`${styles.views} ${inDev ? styles.italic : ""}`}>
        {renderViews(views as number)}
      </span>
      <section className={styles.progressBar}>{renderStatus()}</section>
    </section>
  );
}
