"use server";

import { cache } from "react";
import Course from "../models/Course";

export const getAllCourses = cache(async () => {
  try {
    const courses = await Course.find().sort({ createdAt: "asc" });
    return { success: true, data: JSON.parse(JSON.stringify(courses)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});

// export const getMyCourses = cache(async (userId: string) => {
//   try {
//     if (!userId) {
//       throw new Error("User ID is required");
//     }
//
//     const courses = await Course.find({ userId }).sort({ createdAt: "asc" });
//
//     return {
//       success: true,
//       data: JSON.parse(JSON.stringify(courses)),
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error: (error as Error).message,
//     };
//   }
// });
