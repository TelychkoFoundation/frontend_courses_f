"use server";

import { deleteSession } from "@/lib";
import { User } from "@/models";
import { verifySession } from "@/lib";
import { redirect } from "next/navigation";
import { IPurchasedCourse, IUserDatabaseData } from "@/typings";

export async function getUser() {
  const { isAuth, userID } = await verifySession();

  if (!isAuth) {
    redirect("/login");
  }

  try {
    const currentUser = await User.findOne({ id: Number(userID) });
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

export async function logoutUser() {
  await deleteSession();
}

export async function deleteUser() {
  const { userID } = await verifySession();
  try {
    await User.findOneAndDelete({ id: userID });
    await deleteSession();
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
