"use server";

import { ITelegramUserData } from "@/typings";

const baseURL: string =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4000";

export const loginUser = async (userData: ITelegramUserData) => {
  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Login failed: ${text}`);
  }
};
