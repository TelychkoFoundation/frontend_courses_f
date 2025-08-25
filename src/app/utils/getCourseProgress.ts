import { ICourse, ILessonProgress, IUserDatabaseData } from "@/typings";

export default function getCourseProgress(
  course: ICourse,
  user: IUserDatabaseData | null,
): number {
  if (!user || !course.lessons || course.lessons.length === 0) {
    return 0;
  }

  const completedLessons: ILessonProgress[] | undefined =
    user.lesson_progress?.filter(
      (p: ILessonProgress): boolean =>
        p.course_id === course._id && p.completed,
    );

  if (completedLessons && completedLessons.length > 0) {
    return Math.floor((completedLessons.length / course.lessons.length) * 100);
  }

  return 0;
}
