import { useMemo } from "react";
import { ICategoryLesson, ILesson } from "@/typings";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge, BadgeType, CircleProgressBar } from "@/components";
import { LockIcon, DoneIcon, ExitIcon } from "@/images";
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

  const previous: ICategoryLesson | null | undefined =
    previousAndNextLesson?.previousLesson;
  const next: ICategoryLesson | null | undefined =
    previousAndNextLesson?.nextLesson;

  const renderLockIcon = (lesson: ILesson) => {
    return <LockIcon className={styles.lockIcon} />;
  };

  const renderStatusIcon = (lesson: ILesson) => {
    // return <Image src={DoneIcon} alt="Done Icon" />;
    return <CircleProgressBar progress={64} />;
    // return <Badge type={BadgeType.New}>46 грн</Badge>;
    // return <span className={styles.inDev}>в розробці</span>;
  };

  const redirectToPrevious = () => {
    if (!previous) {
      router.push(`/courses/${params.slug}`);
      return;
    }

    router.push(`/courses/${params.slug}/${previous?.lesson._id}`);
  };

  const redirectToNext = () => {
    if (!next) {
      router.push(`/courses/${params.slug}`);
      return;
    }

    router.push(`/courses/${params.slug}/${next?.lesson._id}`);
  };

  return (
    <>
      <section
        className={styles.paginationSection}
        onClick={redirectToPrevious}
      >
        <span className={styles.title}>
          {previous ? "минулий урок" : "завершити"}
        </span>
        <div className={styles.description}>
          {!previous ? (
            <ExitIcon className={styles.exitIcon} />
          ) : (
            renderLockIcon(currentLesson?.lesson as ILesson)
          )}
          &nbsp;&nbsp;
          {previous ? previous.lesson.title : "Повернутися до курсу"}
          &nbsp;&nbsp;
          {!previous
            ? null
            : renderStatusIcon(currentLesson?.lesson as ILesson)}
        </div>
      </section>
      <section className={styles.paginationSection} onClick={redirectToNext}>
        <span className={styles.title}>
          {next ? "наступний урок" : "старт"}
        </span>
        <div className={styles.description}>
          {!next ? (
            <ExitIcon className={styles.exitIcon} />
          ) : (
            renderLockIcon(currentLesson?.lesson as ILesson)
          )}
          &nbsp;&nbsp;
          {next ? next.lesson.title : "Повернутися до курсу"}&nbsp;&nbsp;
          {!next ? null : renderStatusIcon(currentLesson?.lesson as ILesson)}
        </div>
      </section>
    </>
  );
}
