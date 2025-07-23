"use server";

import { Course } from "@/models";
import { CourseKeyTypes, ICourseBasePayload } from "@/typings";

export async function createCourse(data: ICourseBasePayload) {
  try {
    const existingCourse = await Course.findOne({ courseKey: data.courseKey });

    if (existingCourse) {
      return {
        success: false,
        error: `Курс з ключем "${data.courseKey}" вже існує.`,
      };
    }

    await Course.create(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getCurrentCourse(courseKey: CourseKeyTypes) {
  try {
    const course = await Course.findOne({ courseKey });

    if (!course) {
      return { success: false, error: "Курс не знайдено" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(course)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteCourseById(id: string) {
  try {
    await Course.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateCourse(id: string, data: ICourseBasePayload) {
  try {
    const updated = await Course.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, error: "Курс не знайдено" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
