"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import User from "../models/User";

export async function deleteUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    redirect("/");
  }

  try {
    await User.findOneAndDelete({ id: Number(token.value) });

    cookieStore.delete("token");
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return { success: false, error: error.message };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
