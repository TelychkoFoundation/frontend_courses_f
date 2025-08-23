import { MouseEvent, useMemo, useTransition } from "react";
import { Button, ButtonType } from "@/components";
import Image from "next/image";
import { IPurchasedLesson, ILesson } from "@/typings";
import { LockIcon } from "@/images";
import { useParams, useRouter } from "next/navigation";
import LessonShortInfo from "../LessonShortInfo";
import { useAuth } from "@/hooks";
import styles from "./index.module.css";
import { createPaymentForLesson } from "@/actions";
import { useSession } from "next-auth/react";

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

  const { user } = useAuth();

  const isCurrentLessonPaid: boolean = useMemo(() => {
    if (user) {
      return !!user.purchased_lessons?.find(
        (purchasedLesson: IPurchasedLesson): boolean =>
          purchasedLesson.lesson_id === lesson._id,
      );
    }

    return false;
  }, [lesson._id, user]);

  const renderLock = () => {
    if (!isCurrentLessonPaid) {
      return (
        <div className={styles.lock}>
          <Button
            type={ButtonType.PRIMARY}
            className={styles.payButton}
            loading={isPending}
            onClick={payForLesson}
          >
            <Image src={LockIcon} alt="Lock Icon" />
            <span className={styles.price}>46 грн</span>
          </Button>
        </div>
      );
    }

    if (inDev) {
      return <Image src={LockIcon} alt="Lock Icon" className={styles.lock} />;
    }
  };

  const redirectToLesson = () => {
    router.push(`/courses/${params.slug}/${lesson._id}`);
  };

  return (
    <figure className={styles.lesson} onClick={redirectToLesson}>
      <div
        className={`${styles.poster} ${inDev ? styles.darker : ""} ${isDone ? styles.donePoster : ""}`}
      >
        {renderLock()}
        <img src="/poster.png" alt="Poster" />
      </div>
      <figcaption className={styles.info}>
        <h5 className={styles.title}>{lesson.title}</h5>
        <LessonShortInfo
          xp_reward={lesson.xp_reward}
          views={lesson.views}
          isCurrentLessonPaid={isCurrentLessonPaid}
        />
      </figcaption>
    </figure>
  );
}
