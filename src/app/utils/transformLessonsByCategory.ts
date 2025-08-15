import { ICategoryStructure, ILesson } from "@/typings";

export default function transformLessonsByCategory(
  lessons: ILesson[],
  categories: { [key: number]: string },
): ICategoryStructure[] {
  const sortedCategories = Object.entries(categories)
    .map(([index, name]) => ({
      index: Number(index),
      name,
    }))
    .sort((a, b) => a.index - b.index);

  const result: ICategoryStructure[] = [];

  for (let i = 0; i < sortedCategories.length; i += 1) {
    const currentCategory = sortedCategories[i];
    const nextCategory = sortedCategories[i + 1];

    const categoryLessons = [];
    for (const lesson of lessons) {
      if (
        lesson.order >= currentCategory.index &&
        (nextCategory ? lesson.order < nextCategory.index : true)
      ) {
        categoryLessons.push({
          ...lesson,
          title: `${i + 1}.${categoryLessons.length + 1}. ${lesson.title}`,
        });
      }
    }

    result.push({
      category: currentCategory.name,
      lessons: categoryLessons,
    });
  }

  return result;
}
