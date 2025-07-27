"use server";

import { Course, User } from "@/models";
import { IMyCourses } from "@/typings";

export const getAllCourses = async () => {
  try {
    const courses = await Course.find().sort({ createdAt: "asc" });
    return { success: true, data: JSON.parse(JSON.stringify(courses)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getMyCourses = async (userId: string | number) => {
  try {
    // Получаем данные о курсах пользователя через его массив my_courses
    const my_courses: IMyCourses[] = await User.findOne({
      id: userId,
    }).populate("my_courses.course_id"); // Загружаем информацию о курсах

    const courses = my_courses?.map(course => course.course_id);

    return {
      success: true,
      data: courses,
    };
  } catch (error) {
    console.error("Ошибка получения моих курсов:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Неизвестная ошибка",
    };
  }
};
