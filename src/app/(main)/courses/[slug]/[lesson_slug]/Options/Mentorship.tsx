import Image from "next/image";
import {
  LockDarkIcon,
  DividerVertical,
  TelegramIcon,
  LockIcon,
} from "@/images";
import { TgCircle } from "@/components";
import { useLessons } from "@/hooks";
import styles from "./index.module.css";

export default function Mentorship() {
  const { isCurrentLessonPaid } = useLessons();

  const openAssist = async () => {
    // if (!user) {
    //   return;
    // }
    //
    // if (!currentCourse) {
    //   return;
    // }
    //
    // const { success } = await isFullCoursePurchased(
    //   user.id,
    //   currentCourse._id as string,
    // );
    //
    // console.log("isFullCourse", success);
    //
    // const payload = `${currentCourse._id}_${lessonID}_${success ? 1 : 0}`;
    //
    // window.open(
    //   `https://t.me/mentorship_frontend_courses_bot?start=${payload}`,
    //   "_blank",
    // );
  };

  const renderMentorDescription = () => {
    if (!isCurrentLessonPaid) {
      return (
        <span className={styles.mentorshipDescription}>
          2 питання ментору - безкоштовно
        </span>
      );
    }

    // return (
    //   <div className={styles.mentorshipDescription}>
    //     <span className={styles.alert}>Залишилось 45хв</span>
    //     <DividerVertical className={styles.divider} />
    //     <span>Питань: 0/2</span>
    //   </div>
    // );

    // return (
    //   <div className={styles.mentorshipDescription}>
    //     <span>Залишилось 23год 59хв</span>
    //     <DividerVertical className={styles.divider} />
    //     <span>Питань: 0/2</span>
    //   </div>
    // );

    // return (
    //   <div className={styles.mentorshipDescription}>
    //     <span>
    //       Безкоштовні питання вичерпано.&nbsp;
    //       <span className={styles.feedback}>Платна консультація</span>
    //     </span>
    //   </div>
    // );

    // return (
    //   <div className={styles.mentorshipDescription}>
    //     <span className={styles.alert}>Час вийшов</span>
    //     <DividerVertical className={styles.divider} />
    //     <span>Питань: 1/2</span>
    //     <DividerVertical className={styles.divider} />
    //     <span className={styles.feedback}>Платна консультація</span>
    //   </div>
    // );
  };

  const renderIcon = () => {
    return (
      <TgCircle>
        {!isCurrentLessonPaid ? (
          <Image src={LockIcon} alt="Tg Circle" className={styles.lockIcon} />
        ) : (
          <Image src={TelegramIcon} alt="Telegram Icon" />
        )}
      </TgCircle>
    );
  };

  return (
    <section className={styles.collapsedSection} onClick={openAssist}>
      <div className={styles.mentorshipContainer}>
        <p className={styles.collapsedTitle}>Задати питання</p>
        {renderMentorDescription()}
      </div>
      {renderIcon()}
    </section>
  );
}
