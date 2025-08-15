import { ILesson } from "@/typings";

export default function transformLessonByCategory(
  lesson: ILesson,
  categories: { [key: number]: string },
): { category: string; lesson: ILesson } {
  const sortedCategories = Object.entries(categories)
    .map(([index, name]) => ({
      index: Number(index),
      name,
    }))
    .sort((a, b) => a.index - b.index);

  const categoryIndex = sortedCategories.findIndex((currentCategory, i) => {
    const nextCategory = sortedCategories[i + 1];
    return (
      lesson.order >= currentCategory.index &&
      (nextCategory ? lesson.order < nextCategory.index : true)
    );
  });

  if (categoryIndex === -1) {
    throw new Error(`Category not found for lesson with order ${lesson.order}`);
  }

  const category = sortedCategories[categoryIndex];

  let lessonIndex = 1;
  for (let i = category.index; i < lesson.order; i += 1) {
    if (
      i >= category.index && // Входить у поточну категорію
      (!sortedCategories[categoryIndex + 1] ||
        i < sortedCategories[categoryIndex + 1].index) // І не переходить до наступної
    ) {
      lessonIndex += 1;
    }
  }

  const transformedLesson = {
    ...lesson,
    title: `${categoryIndex + 1}.${lessonIndex}. ${lesson.title}`,
  };

  return {
    category: category.name,
    lesson: transformedLesson,
  };
}
