"use server";

import { Course } from "@/models";
import { ICourseBasePayload } from "@/typings";

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
