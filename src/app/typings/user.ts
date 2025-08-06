import { Types, Document } from "mongoose";

// Telegram данные о пользователе
export interface ITelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// Подписка пользователя
export interface ISubscriptionData {
  active: boolean;
  started_at?: Date;
  ends_at?: Date;
  auto_renew: boolean;
}

// Прогресс уроков
export interface ILessonProgress {
  lesson_id: Types.ObjectId; // ID урока
  course_id: Types.ObjectId; // ID курса, которому принадлежит урок
  watched_at: Date; // Когда был просмотрен
  duration?: number; // Продолжительность в секундах
  completed: boolean; // Завершён ли урок
}

// Покупка уроков
export interface IPurchasedLesson {
  lesson_id: Types.ObjectId | string; // ID урока
  course_id: Types.ObjectId | string; // ID курса
  purchased_at: Date;
  invoice_id: string;
}

// Купівля курсу
export interface IPurchasedCourse {
  course_id: Types.ObjectId;
  purchased_at: Date;
}

// Отзывы и рейтинги
export interface IReview {
  course_id: Types.ObjectId; // ID курса
  rating: number; // Рейтинг: 1-5
  comment?: string; // Текст комментария
  created_at: Date; // Дата создания
}

// Напоминания
export interface IReminder {
  lesson_id?: Types.ObjectId; // ID урока (необязательно)
  course_id?: Types.ObjectId; // ID курса (необязательно)
  reminder_at: Date; // Когда напоминание активировать
  status: "active" | "completed" | "missed"; // Статус напоминания
}

// Реферальная система
export interface IReferral {
  referred_user_id: Types.ObjectId; // ID приглашённого пользователя
  referred_at: Date; // Дата, когда пользователь был приглашён
  bonus_granted: boolean; // Был ли выдан бонус
}

// My courses
export interface IMyCourses {
  course_id: Types.ObjectId; // ID приглашённого пользователя
  started_on: Date; // Дата, когда пользователь был приглашён
  status: "in_progress" | "completed"; // Был ли выдан бонус
}

export interface MentorshipData {
  expiresAt: Date | null;
  questionsLeft: number;
}

// Полная информация о пользователе в базе данных (с расширением Telegram данных)
export type IUserDatabaseData = ITelegramUserData &
  Document & {
    purchased_lessons?: IPurchasedLesson[]; // Купленные уроки
    purchased_courses?: IPurchasedCourse[]; // Купленные курсы
    subscription: ISubscriptionData; // Подписка

    lesson_progress?: ILessonProgress[]; // Прогресс уроков
    reminders?: IReminder[]; // Напоминания
    reviews?: IReview[]; // Отзывы и оценки
    referrals?: IReferral[]; // Рефералы
    my_courses?: IMyCourses[];

    xp: number; // Очки опыта
    level: number; // Уровень пользователя

    total_spent: number; // Потраченная пользователем сумма
    lastLogin?: Date; // Последний вход пользователя
    mentorship?: MentorshipData;
    createdAt?: Date; // Автоматически генерируемое поле при записи (из Mongoose)
    updatedAt?: Date; // Автоматически обновляемое поле при записи (из Mongoose)
  };
