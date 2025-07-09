"use server";

import { cookies } from "next/headers";
import User from "../models/User";
import Course from "../models/Course";

export async function deleteUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  try {
    await User.findOneAndDelete({ id: Number(token?.value) });
    cookieStore.delete("token");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function deleteCourseById(id: string) {
  try {
    await Course.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
