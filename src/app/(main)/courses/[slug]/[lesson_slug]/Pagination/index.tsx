import { useMemo } from "react";
import { ILesson } from "@/typings";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Badge, BadgeType, CircleProgressBar } from "@/components";
import { LockDarkIcon, DoneIcon } from "@/images";
import { useLessons } from "@/hooks";
import { findPreviousAndNextLessons } from "@/utils";
import styles from "./index.module.css";

export default function Pagination() {
  const { currentLesson, allLessons } = useLessons();
  const params = useParams();
  const router = useRouter();

  const previousAndNextLesson = useMemo(() => {
    if (!currentLesson) return;
    if (!allLessons) return;

    return findPreviousAndNextLessons(allLessons, currentLesson);
  }, [allLessons, currentLesson]);

  const renderLockIcon = (lesson: ILesson) => {
    return <Image src={LockDarkIcon} alt="Lock Icon" />;
  };

  const renderStatusIcon = (lesson: ILesson) => {
    // return <Image src={DoneIcon} alt="Done Icon" />;
    return <CircleProgressBar progress={64} />;
    // return <Badge type={BadgeType.New}>46 грн</Badge>;
    // return <span className={styles.inDev}>в розробці</span>;
  };

  const redirectToPrevious = () => {
    if (!previousAndNextLesson?.previousLesson) {
      return;
    }

    router.push(
      `/courses/${params.slug}/${previousAndNextLesson?.previousLesson?.lesson._id}`,
    );
  };

  const redirectToNext = () => {
    if (!previousAndNextLesson?.nextLesson) {
      return;
    }

    router.push(
      `/courses/${params.slug}/${previousAndNextLesson?.nextLesson?.lesson._id}`,
    );
  };

  return (
    <>
      <section
        className={styles.paginationSection}
        onClick={redirectToPrevious}
      >
        <span className={styles.title}>минулий урок</span>
        <p className={styles.description}>
          {renderLockIcon(currentLesson?.lesson as ILesson)}&nbsp;&nbsp;
          {previousAndNextLesson?.previousLesson?.lesson.title}&nbsp;&nbsp;
        </p>
      </section>
      <section className={styles.paginationSection} onClick={redirectToNext}>
        <span className={styles.title}>наступний урок</span>
        <div className={styles.description}>
          {renderLockIcon(currentLesson?.lesson as ILesson)}&nbsp;&nbsp;
          {previousAndNextLesson?.nextLesson?.lesson.title}&nbsp;&nbsp;
          {renderStatusIcon(currentLesson?.lesson as ILesson)}
        </div>
      </section>
    </>
  );
}
