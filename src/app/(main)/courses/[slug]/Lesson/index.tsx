import { MouseEvent, useMemo, useTransition } from "react";
import { Badge, BadgeSize, BadgeType, Button, ButtonType } from "@/components";
import { ICourse, ILesson } from "@/typings";
import { LockIcon, LockIconSize } from "@/images";
import { useParams, useRouter } from "next/navigation";
import LessonShortInfo from "../LessonShortInfo";
import { useAuth, useCourses, useLessons } from "@/hooks";
import { createPaymentForLesson } from "@/actions";
import { useSession } from "next-auth/react";
import styles from "./index.module.css";

const inDev = false;
const isDone = false;

interface ILessonProps {
  lesson: ILesson;
}

export default function Lesson({ lesson }: ILessonProps) {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data } = useSession();
  const { allCourses } = useCourses();
  const { user } = useAuth();
  const { isCurrentLessonCompleted, isCurrentLessonPaid } = useLessons();

  const lessonCourse: string = useMemo(() => {
    const course: ICourse | undefined = allCourses?.find(
      (course: ICourse) => course._id === lesson.course_id,
    );

    if (course) {
      return course.title;
    }

    return "";
  }, [allCourses?.length, lesson]);

  const payForLesson = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!lesson) {
      return;
    }

    if (!data) {
      return;
    }

    startTransition(() =>
      createPaymentForLesson(
        data?.user?.id as string,
        lesson,
        window.location.href,
      ),
    );
  };

  const renderLock = () => {
    if (!user) {
      return;
    }

    if (!isCurrentLessonPaid) {
      return (
        <div className={styles.lockPosition}>
          <Button
            type={ButtonType.PRIMARY}
            className={styles.payButton}
            loading={isPending}
            onClick={payForLesson}
          >
            <LockIcon
              positionClassname={styles.lock}
              className={styles.lockIcon}
              size={LockIconSize.Large}
            />
            <span className={styles.price}>46 грн</span>
          </Button>
        </div>
      );
    }

    if (inDev) {
      return <LockIcon className={styles.lock} />;
    }
  };

  const redirectToLesson = () => {
    router.push(`/courses/${params.slug}/${lesson._id}`, { scroll: true });
  };

  return (
    <figure
      className={`${styles.lesson} ${params.lesson_slug ? styles.lessonRelated : ""}`}
      onClick={redirectToLesson}
    >
      <div
        className={`${styles.poster} ${inDev ? styles.darker : ""} ${isDone ? styles.donePoster : ""}`}
      >
        {renderLock()}
        <img src="/poster.png" alt="Poster" />
      </div>
      <figcaption className={styles.info}>
        {params.lesson_slug ? (
          <Badge type={BadgeType.Tag} size={BadgeSize.Large}>
            {lessonCourse}
          </Badge>
        ) : null}
        <h5 className={styles.title}>{lesson.title}</h5>
        <LessonShortInfo
          xp_reward={lesson.xp_reward}
          views={lesson.views}
          isCurrentLessonPaid={isCurrentLessonPaid}
          isCurrentLessonCompleted={isCurrentLessonCompleted}
        />
      </figcaption>
    </figure>
  );
}
