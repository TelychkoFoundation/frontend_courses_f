"use server";

import { ITelegramUserData } from "@/typings";
import { User } from "@/models";
import { createSession } from "@/lib";

export async function loginUser(userData: ITelegramUserData) {
  try {
    const now = new Date();

    // Используем "findOneAndUpdate" с upsert, чтобы создать или обновить пользователя
    const user = await User.findOneAndUpdate(
      { id: userData.id }, // Уникальный Telegram ID
      {
        $setOnInsert: {
          // Если создаём пользователя
          first_name: userData.first_name,
          last_name: userData.last_name || "",
          username: userData.username || null,
          photo_url: userData.photo_url || null,
          auth_date: userData.auth_date,
          hash: userData.hash, // Telegram-хэш
          xp: 0, // Начальное значение опыта
          level: 1, // Начальный уровень
          total_spent: 0, // Пользователь не потратил
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
          // Если пользователь уже существует, обновляем поля
          lastLogin: now, // Фиксируем последний вход
        },
      },
      {
        new: true, // Вернуть обновленный документ
        upsert: true, // Создать, если не найден
      },
    );

    await createSession(user.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}
