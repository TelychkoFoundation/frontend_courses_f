import { ILesson, ILessonProgress, IUserDatabaseData } from "@/typings";

export default function getLessonProgress(
  lesson: ILesson,
  user: IUserDatabaseData | null,
): number {
  if (!user || !lesson.video_duration) {
    return 0;
  }

  const progress: ILessonProgress | undefined = user.lesson_progress?.find(
    (p: ILessonProgress): boolean => p.lesson_id === lesson._id,
  );

  if (progress && (progress.duration as number) > 0) {
    // Обмежуємо значення, щоб не перевищувало 100%
    return Math.min(
      100,
      Math.floor(((progress.duration as number) / lesson.video_duration) * 100),
    );
  }

  return 0;
}
