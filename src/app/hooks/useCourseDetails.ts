import { ICourse, ILessonProgress, IMyCourses } from "@/typings";
import { useMemo } from "react";
import { useAuth } from "./useAuth";

export const useCourseDetails = (course: ICourse) => {
  const { user } = useAuth();

  const completedLessons: number | any = useMemo(() => {
    if (!user || !user.lesson_progress) return [];

    return user.lesson_progress?.filter(
      (p: ILessonProgress): boolean =>
        p.course_id === (course?._id as any) && p.completed,
    ).length;
  }, [user?.lesson_progress, course?._id]);

  const courseProgress = useMemo(() => {
    if (completedLessons && completedLessons > 0) {
      return Math.floor((completedLessons / course.lessons.length) * 100);
    }

    return 0;
  }, [completedLessons, course?.lessons?.length]);

  const courseDetails = useMemo(() => {
    const data = user?.my_courses?.find(
      (myCourse: IMyCourses): boolean => myCourse?.course_id === course?._id,
    );

    return {
      status: data?.status,
      hasStarted: !!data,
    };
  }, [course?._id, user?.my_courses]);

  return {
    completedLessons,
    courseProgress,
    courseDetails,
  };
};
