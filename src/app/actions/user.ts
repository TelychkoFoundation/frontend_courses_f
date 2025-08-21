"use server";

import { createDBConnection } from "@/lib";
import { User } from "@/models";
import { IPurchasedCourse, IUserDatabaseData } from "@/typings";

export async function checkDBConnection() {
  const isDatabaseConnected = await createDBConnection();

  if (!isDatabaseConnected) {
    return { success: false, error: "Database have not connected" };
  }

  return { success: true };
}

export async function getUser(id: string) {
  try {
    const currentUser = await User.findOne({ id });
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

export async function isFullCoursePurchased(userID: number, courseID: string) {
  try {
    const user: IUserDatabaseData | null = await User.findOne({ id: userID });

    if (!user) {
      return { success: false };
    }

    const hasPurchased: boolean = (
      user.purchased_courses as IPurchasedCourse[]
    ).some(
      ({ course_id }: IPurchasedCourse): boolean =>
        course_id.toString() === courseID,
    );

    return { success: hasPurchased };
  } catch (error) {
    console.error("❌ Error checking course purchase:", error);
    return { success: false, error: (error as Error).message };
  }
}
