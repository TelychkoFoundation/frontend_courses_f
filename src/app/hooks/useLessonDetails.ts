import { useMemo } from "react";
import { IPurchasedLesson, ILessonProgress, ICourse, ILesson } from "@/typings";
import { useAuth } from "./useAuth";
import { useCourses } from "./useCourses";

export const useLessonDetails = (
  lessonId: string,
  courseId: string,
  video_duration?: number,
) => {
  const { user } = useAuth();
  const { allCourses } = useCourses();

  const isCurrentLessonPaid: boolean = useMemo(() => {
    if (!user || !lessonId || !user.purchased_lessons) {
      return false;
    }

    return !!user.purchased_lessons.find(
      (purchasedLesson: IPurchasedLesson): boolean =>
        purchasedLesson.lesson_id === lessonId,
    );
  }, [lessonId, user?.purchased_lessons]);

  const isCurrentLessonCompleted: boolean = useMemo(() => {
    if (!user || !lessonId || !user.lesson_progress) {
      return false;
    }

    const lessonProgressData: ILessonProgress | undefined =
      user.lesson_progress.find(
        (lessonProgress: ILessonProgress): boolean =>
          lessonProgress.lesson_id === (lessonId as any),
      );

    return !!lessonProgressData?.completed;
  }, [lessonId, user?.lesson_progress]);

  const lessonCourse: string = useMemo(() => {
    if (!allCourses || !lessonId) {
      return "";
    }

    const course: ICourse | undefined = allCourses.find(
      (course: ICourse) => course._id === courseId,
    );

    return course ? course.title : "";
  }, [allCourses, courseId]);

  const lessonProgress = useMemo(() => {
    if (!lessonId || !user || !video_duration) return 0;

    const progress: ILessonProgress | undefined = user.lesson_progress?.find(
      (p: ILessonProgress): boolean => p.lesson_id === (lessonId as any),
    );

    if (progress && (progress.duration as number) > 0) {
      return Math.min(
        100,
        Math.floor(((progress.duration as number) / video_duration) * 100),
      );
    }

    return 0;
  }, [video_duration, user?.lesson_progress, lessonId]);

  return {
    isCurrentLessonPaid,
    isCurrentLessonCompleted,
    lessonCourse,
    lessonProgress,
  };
};
