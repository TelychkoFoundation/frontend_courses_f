"use server";

import { ITelegramUserData } from "@/typings";
import { createDBConnection } from "@/lib";

const baseURL: string = process.env.SITE_URL || "http://localhost:4000";

export const loginUser = async (userData: ITelegramUserData) => {
  await createDBConnection();

  const response = await fetch(`${baseURL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Login failed:", text);
    throw new Error(`Login failed: ${text}`);
  }
};
