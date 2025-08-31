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
      router.push(`/courses/${params.slug}`, { scroll: true });
      return;
    }

    router.push(`/courses/${params.slug}/${previous?.lesson._id}`, {
      scroll: true,
    });
  };

  const redirectToNext = () => {
    if (!next) {
      router.push(`/courses/${params.slug}`, { scroll: true });
      return;
    }

    router.push(`/courses/${params.slug}/${next?.lesson._id}`, {
      scroll: true,
    });
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
          <div className={styles.descriptionInner}>
            <div>
              {!previous ? (
                <ExitIcon className={styles.exitIcon} />
              ) : (
                renderLockIcon(currentLesson?.lesson as ILesson)
              )}
            </div>
            &nbsp;&nbsp;
            <span>
              {previous ? previous.lesson.title : "Повернутися до курсу"}
            </span>
          </div>
          &nbsp;&nbsp;
          <span>
            {!previous
              ? null
              : renderStatusIcon(currentLesson?.lesson as ILesson)}
          </span>
        </div>
      </section>
      <section className={styles.paginationSection} onClick={redirectToNext}>
        <div className={styles.title}>{next ? "наступний урок" : "старт"}</div>
        <div className={styles.description}>
          <div className={styles.descriptionInner}>
            <div>
              {!next ? (
                <ExitIcon className={styles.exitIcon} />
              ) : (
                renderLockIcon(currentLesson?.lesson as ILesson)
              )}
            </div>
            &nbsp;&nbsp;
            <span>{next ? next.lesson.title : "Повернутися до курсу"}</span>
          </div>
          &nbsp;&nbsp;
          <span>
            {!next ? null : renderStatusIcon(currentLesson?.lesson as ILesson)}
          </span>
        </div>
      </section>
    </>
  );
}
