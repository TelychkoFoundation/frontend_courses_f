"use server";

import User from "../models/User";
import { cookies } from "next/headers";
import dbConnect from "./db";

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
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return { success: false, error: error.message };
  }
}
