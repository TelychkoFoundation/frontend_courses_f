"use server";
//
// import { ITelegramUserData } from "@/typings";
//
// const baseURL: string = process.env.SITE_URL || "http://localhost:4000";
//
// export const loginUser = async (userData: ITelegramUserData) => {
//   const response = await fetch(`${baseURL}/api/auth/login`, {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//
//   if (!response.ok) {
//     const text = await response.text();
//     console.error("Login failed:", text);
//     throw new Error(`Login failed: ${text}`);
//   }
// };

import { ITelegramUserData } from "@/typings";
import { cookies } from "next/headers";
import { encrypt, SESSION_KEY } from "@/lib"; // твій JWT helper
import { User } from "@/models";
import { createDBConnection } from "@/lib";

export const loginUser = async (userData: ITelegramUserData) => {
  await createDBConnection();

  const now = new Date();

  const user = await User.findOneAndUpdate(
    { id: userData.id },
    {
      $setOnInsert: {
        first_name: userData.first_name,
        last_name: userData.last_name || "",
        username: userData.username || null,
        photo_url: userData.photo_url || null,
        auth_date: userData.auth_date,
        hash: userData.hash,
        xp: 0,
        level: 1,
        total_spent: 0,
        subscription: {
          active: false,
          auto_renew: false,
          started_at: null,
          ends_at: null,
        },
        purchased_lessons: [],
        purchased_courses: [],
        lesson_progress: [],
        reminders: [],
        reviews: [],
        referrals: [],
        my_courses: [],
      },
      $set: {
        lastLogin: now,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );

  // Створюємо сесію прямо тут
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await encrypt({ userID: user.id, expiresAt });

  (await cookies()).set(SESSION_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { success: true };
};
