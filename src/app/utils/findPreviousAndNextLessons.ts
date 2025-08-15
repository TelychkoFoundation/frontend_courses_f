import { ICategoryLesson, ICategoryStructure, ILesson } from "@/typings";

export default function findPreviousAndNextLessons(
  categories: ICategoryStructure[],
  targetLesson: ICategoryLesson,
): {
  previousLesson: ICategoryLesson | null;
  nextLesson: ICategoryLesson | null;
} {
  let previousLesson: ICategoryLesson | null = null;
  let nextLesson: ICategoryLesson | null = null;
  let i;

  for (i = 0; i < categories.length; i += 1) {
    const currentCategory: ICategoryStructure = categories[i];

    const lessonIndex: number = currentCategory.lessons.findIndex(
      (lesson: ILesson): boolean => lesson._id === targetLesson.lesson._id,
    );

    if (lessonIndex !== -1) {
      if (lessonIndex > 0) {
        previousLesson = {
          category: currentCategory.category,
          lesson: currentCategory.lessons[lessonIndex - 1],
        };
      }

      if (lessonIndex < currentCategory.lessons.length - 1) {
        nextLesson = {
          category: currentCategory.category,
          lesson: currentCategory.lessons[lessonIndex + 1],
        };
      }

      if (lessonIndex === 0 && i > 0) {
        const previousCategory = categories[i - 1];
        const lastLessonOfPrevCategory =
          previousCategory.lessons[previousCategory.lessons.length - 1];
        previousLesson = {
          category: previousCategory.category,
          lesson: lastLessonOfPrevCategory,
        };
      }

      if (
        lessonIndex === currentCategory.lessons.length - 1 &&
        i < categories.length - 1
      ) {
        const nextCategory = categories[i + 1];
        const firstLessonOfNextCategory = nextCategory.lessons[0];
        nextLesson = {
          category: nextCategory.category,
          lesson: firstLessonOfNextCategory,
        };
      }

      break;
    }
  }

  return {
    previousLesson,
    nextLesson,
  };
}
