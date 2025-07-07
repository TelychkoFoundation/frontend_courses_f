"use server";

import User from "../models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dbConnect from "./db";

export async function createDBConnection() {
  await dbConnect();
}

export async function getUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    redirect("/");
  }

  try {
    const currentUser = await User.findOne({ id: Number(token.value) });

    return { success: true, data: JSON.parse(JSON.stringify(currentUser)) };
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return { success: false, error: error.message };
  }
}
