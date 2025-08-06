import styles from "./index.module.css";
import { GrFormView } from "react-icons/gr";
import { useState, MouseEvent } from "react";
import { GiNinjaHead } from "react-icons/gi";
import { FaRegFileLines } from "react-icons/fa6";
import Title from "./Title";
import { useCourses, useUser } from "@/hooks";

interface IVideoInfoProps {
  title: string;
  description: string;
  index: number;
  views: number;
  xp_reward: number;
  transcript_url: string;
  isPaid: boolean;
  lessonID: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function VideoInfo({
  index,
  title,
  description,
  views,
  xp_reward,
  transcript_url,
  isPaid,
  lessonID,
  onClick,
}: IVideoInfoProps) {
  const [isVideoInfoHovered, setVideoInfoHovered] = useState<boolean>(false);
  const { user } = useUser();
  const { currentCourse } = useCourses();

  const openDocument = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
  };

  const openAssist = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    const isFullCourse = false;
    const payload = `${user?.id}_${currentCourse?._id}_${lessonID}_${isFullCourse ? 1 : 0}`;

    window.open(
      `https://t.me/mentorship_frontend_courses_bot?start=${payload}`,
      "_blank",
    );
  };

  return (
    <div
      onClick={onClick}
      className={styles.content}
      onMouseEnter={() => setVideoInfoHovered(true)}
      onMouseLeave={() => setVideoInfoHovered(false)}
    >
      <Title
        index={index}
        title={title}
        description={description}
        isVideoInfoHovered={isVideoInfoHovered}
      />

      <div className={styles.footer}>
        <section className={styles.footerLeft}>
          <div className={styles.xp}>+{xp_reward} XP</div>
          <div className={styles.views}>
            <GrFormView size={22} /> {views}
          </div>
        </section>

        <section
          className={`${styles.footerRight} ${!isPaid ? styles.disabled : ""}`}
        >
          <FaRegFileLines size={22} onClick={openDocument} />
          <GiNinjaHead size={22} onClick={openAssist} />
        </section>
      </div>
    </div>
  );
}
