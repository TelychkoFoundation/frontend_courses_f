"use server";

import { IGoogleUserData } from "@/typings";
import { User } from "@/models";
import { createDBConnection } from "@/lib";

export async function checkDBConnection() {
  const isDatabaseConnected = await createDBConnection();

  if (!isDatabaseConnected) {
    return { success: false, error: "Database have not connected" };
  }

  return { success: true };
}

export const saveUser = async (userData: IGoogleUserData) => {
  const now = new Date();

  await User.findOneAndUpdate(
    { id: userData.id },
    {
      $setOnInsert: {
        provider: userData.provider,
        email: userData.email,
        name: userData.name,
        image: userData.image,
        emailVerified: userData.emailVerified,
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
        mentorship: {
          expiresAt: null,
          questionsLeft: 0,
        },
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

  return { success: true };
};
