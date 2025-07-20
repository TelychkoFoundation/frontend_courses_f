"use server";

import User from "../models/User";
import Course from "../models/Course";
import { cookies } from "next/headers";
import dbConnect from "./db";
import { CourseKeyTypes } from "@/typings";

export async function createDBConnection() {
  await dbConnect();
}

export async function getCookieToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  return token?.value;
}

export async function getUser(token: string) {
  try {
    const currentUser = await User.findOne({ id: Number(token) });

    if (!currentUser) {
      return {
        success: false,
        error: "Користувача не знайдено. Будь ласка, зареєструйтесь!",
      };
    }

    return { success: true, data: JSON.parse(JSON.stringify(currentUser)) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}

export async function getAllCourses() {
  try {
    const courses = await Course.find().sort({ createdAt: "asc" });
    return { success: true, data: JSON.parse(JSON.stringify(courses)) };
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
