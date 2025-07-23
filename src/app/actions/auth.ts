"use server";

import { ITelegramUserData } from "@/typings";
import { User } from "@/models";
import { createSession, updateSession } from "@/lib";
import { redirect } from "next/navigation";

export async function signup(userData: ITelegramUserData) {
  const newUser = await User.create(userData);
  await createSession(newUser.id);
  redirect("/courses");
}

export async function loginUser(userData: ITelegramUserData) {
  try {
    const user = await User.findOne({ id: userData.id });

    if (!user) {
      return { success: false, error: "Користувача не знайдено" };
    }

    await createSession(user.id);
    // await user.save();
    // await updateSession();

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}
