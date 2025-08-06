"use server";

import { User } from "@/models";

export async function activateOneLessonMentorship(id: number) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

  await User.updateOne(
    { id },
    {
      $set: {
        "mentorship.expiresAt": expiresAt,
        "mentorship.questionsLeft": 2,
      },
    },
  );
}

export async function activateOneCourseMentorship(id: number) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await User.updateOne(
    { id },
    {
      $set: {
        "mentorship.expiresAt": expiresAt,
        "mentorship.questionsLeft": 30,
      },
    },
  );
}

export async function decrementQuestionsLeft(id: number) {
  await User.updateOne(
    { id, "mentorship.questionsLeft": { $gt: 0 } },
    { $inc: { "mentorship.questionsLeft": -1 } },
  );
}

export async function isMentorshipActive(id: number): Promise<boolean> {
  const user = await User.findOne({ id });

  if (!user?.mentorship?.expiresAt) return false;

  return user.mentorship.expiresAt.getTime() > Date.now();
}

export async function getQuestionsLeft(id: number): Promise<number> {
  const user = await User.findOne({ id });
  return user?.mentorship?.questionsLeft ?? 0;
}
