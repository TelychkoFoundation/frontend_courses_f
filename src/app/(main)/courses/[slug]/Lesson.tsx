import styles from "./page.module.css";
import VideoContainer from "./VideoContainer";
import VideoInfo from "./VideoInfo";
import { ILesson, IPurchasedLesson } from "@/typings";
import { useUser } from "@/hooks";
import { MouseEvent, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";

interface ILessonProps {
  index: number;
  lesson: ILesson;
}

export const Lesson = ({ lesson, index }: ILessonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();

  const isLessonPaid: boolean = useMemo(() => {
    if (user) {
      return !!user.purchased_lessons?.find(
        (purchasedLesson: IPurchasedLesson): boolean =>
          purchasedLesson.lesson_id === lesson._id,
      );
    }

    return false;
  }, [lesson._id, user]);

  const openLesson = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push(`/courses/${params.slug}/${lesson._id}`);
  };

  return (
    <section className={styles.lesson} key={lesson._id as string}>
      <VideoContainer videoKey={lesson.video_key} isPaid={isLessonPaid} />
      <VideoInfo
        index={index}
        lessonID={lesson._id as string}
        title={lesson.title}
        description={lesson.description as string}
        views={lesson.views as number}
        xp_reward={lesson.xp_reward}
        transcript_url={lesson.transcript_url as string}
        isPaid={isLessonPaid}
        onClick={openLesson}
      />
    </section>
  );
};
