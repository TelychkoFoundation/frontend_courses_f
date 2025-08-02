import styles from "./page.module.css";
import VideoContainer from "./VideoContainer";
import VideoInfo from "./VideoInfo";
import { ILesson, IPurchasedLesson, QueryDrawerType } from "@/typings";
import { useLessons, useUser, useDrawer } from "@/hooks";
import { MouseEvent, useMemo } from "react";

interface ILessonProps {
  index: number;
  lesson: ILesson;
}

export const Lesson = ({ lesson, index }: ILessonProps) => {
  const { user } = useUser();
  const { setCurrentLesson } = useLessons();
  const { openDrawerWithQueryString } = useDrawer();

  const isLessonPaid: boolean = useMemo(() => {
    if (user) {
      return !!user.purchased_lessons?.find(
        (purchasedLesson: IPurchasedLesson): boolean =>
          purchasedLesson.lesson_id === lesson.id,
      );
    }

    return false;
  }, [lesson.id, user]);

  const openLesson = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setCurrentLesson(lesson);
    openDrawerWithQueryString(QueryDrawerType.CourseContentsDrawer, "topics");
  };

  return (
    <section className={styles.lesson} key={lesson.id}>
      <VideoContainer videoKey={lesson.video_key} isPaid={isLessonPaid} />
      <VideoInfo
        index={index}
        lessonID={(lesson._id as string) || lesson.id}
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
