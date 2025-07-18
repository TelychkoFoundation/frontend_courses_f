"use server";

import User, { IUser } from "../models/User";
import Course from "../models/Course";
import { cookies } from "next/headers";
import { ICourseBasePayload } from "../typings/course";

export async function createUser(userData: IUser) {
  const cookieStore = await cookies();

  try {
    const newUser = await User.create(userData);

    cookieStore.set("token", newUser.id, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}

export async function loginUser(userData: IUser) {
  const cookieStore = await cookies();

  try {
    const user = await User.findOne({ id: userData.id });

    if (!user) {
      return { success: false, error: "Користувача не знайдено" };
    }
    await user.save();

    cookieStore.set("token", String(userData.id), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}

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
