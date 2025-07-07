"use server";

import dbConnect from "./db";
import User, { IUser } from "../models/User";
import { cookies } from "next/headers";

export async function createUser(userData: IUser) {
  const cookieStore = await cookies();

  await dbConnect();

  try {
    const newUser = await User.create(userData);

    cookieStore.set("auth_token", newUser.hash, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return { success: false, error: error.message };
  }
}
