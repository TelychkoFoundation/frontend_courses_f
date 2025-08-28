"use server";

import { Course, User } from "@/models";
import { IMyCourses } from "@/typings";
import { Types } from "mongoose";

export const getAllCourses = async () => {
  try {
    const courses = await Course.find().sort({ createdAt: "asc" });
    return { success: true, data: JSON.parse(JSON.stringify(courses)) };
  } catch (error) {
    console.log(error, "ERROR");
    return { success: false, error: (error as Error).message };
  }
};

export const getMyCourses = async () => {
  // try {
  //   const user: { id: Types.ObjectId; my_courses: IMyCourses[] } =
  //     await User.findOne({
  //       id: userID,
  //     })
  //       .select("my_courses")
  //       .populate("my_courses.course_id");
  //
  //   return {
  //     success: true,
  //     data: user.my_courses,
  //   };
  // } catch (error) {
  //   return {
  //     success: false,
  //     error: error instanceof Error ? error.message : "Неизвестная ошибка",
  //   };
  // }
};
