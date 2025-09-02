import { useMemo } from "react";
import { ICategoryLesson } from "@/typings";
import { useParams, useRouter } from "next/navigation";
import { useLessons } from "@/hooks";
import { findPreviousAndNextLessons } from "@/utils";
import PaginationItem from "./PaginationItem";

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
      <PaginationItem
        redirect={redirectToPrevious}
        lessonId={previous?.lesson._id as string}
        courseId={previous?.lesson.course_id as string}
        title={previous?.lesson ? "минулий урок" : "завершити"}
        lastTitle={
          previous?.lesson ? previous?.lesson.title : "Повернутися до курсу"
        }
        videoDuration={previous?.lesson.video_duration || 0}
      />
      <PaginationItem
        redirect={redirectToNext}
        lessonId={next?.lesson._id as string}
        courseId={next?.lesson.course_id as string}
        title={next?.lesson ? "наступний урок" : "старт"}
        lastTitle={next?.lesson ? next?.lesson.title : "Повернутися до курсу"}
        videoDuration={next?.lesson.video_duration || 0}
      />
    </>
  );
}
