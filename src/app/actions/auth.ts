"use server";

import { ITelegramUserData } from "@/typings";
import { User } from "@/models";
import { createSession } from "@/lib";
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
      await signup(userData);
      return;
    }

    await createSession(user.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}
