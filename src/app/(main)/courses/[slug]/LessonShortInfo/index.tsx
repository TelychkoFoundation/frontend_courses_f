import { Badge, BadgeType, CircleProgressBar } from "@/components";
import Image from "next/image";
import { DoneIcon } from "@/images";
import styles from "./index.module.css";

const inDev = false;
const isDone = false;

interface ILessonShortInfoProps {
  xp_reward: number;
  views: number;
  isCurrentLessonPaid: boolean;
}

export default function LessonShortInfo({
  xp_reward,
  views,
  isCurrentLessonPaid,
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

    if (isDone) {
      return <Image src={DoneIcon} alt="Done Icon" />;
    }

    return <CircleProgressBar progress={0} />;
  };

  return (
    <section className={styles.container}>
      <Badge type={isDone ? BadgeType.Done : BadgeType.NotStarted}>
        +{xp_reward}XP
      </Badge>
      <span className={`${styles.views} ${inDev ? styles.italic : ""}`}>
        {renderViews(views as number)}
      </span>
      <section className={styles.progressBar}>{renderStatus()}</section>
    </section>
  );
}
