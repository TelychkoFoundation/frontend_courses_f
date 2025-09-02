"use server";

import { checkDBConnection } from "./auth";
import { User, Lesson } from "@/models";
import { Types } from "mongoose";
import {
  IPurchasedCourse,
  IUpdateProgressPayload,
  IUserDatabaseData,
} from "@/typings";

export async function getUser(id: string) {
  try {
    const currentUser = await User.findOne({ id });
    if (!currentUser) {
      return {
        success: false,
        error: "Користувача не знайдено. Будь ласка, зареєструйтесь!",
      };
    }

    return { success: true, data: JSON.parse(JSON.stringify(currentUser)) };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }
}

export async function updateUserProgress(
  id: string,
  payload: IUpdateProgressPayload,
) {
  try {
    const { success } = await checkDBConnection();

    if (!success) {
      return { success: false };
    }

    const { lessonId, courseId, watchedDuration, completed } = payload;

    const user = await User.findOne({ id });
    if (!user) {
      throw new Error("User not found");
    }

    const now = new Date();

    // Оновлення прогресу уроку
    const existingProgressIndex = user.lesson_progress.findIndex(
      (p: any) => p.lesson_id.toString() === lessonId,
    );

    if (existingProgressIndex !== -1) {
      // Оновлюємо існуючий запис
      user.lesson_progress[existingProgressIndex].duration = watchedDuration;
      user.lesson_progress[existingProgressIndex].watched_at = now;
      if (completed) {
        user.lesson_progress[existingProgressIndex].completed = true;
      }
    } else {
      // Створюємо новий запис про прогрес
      user.lesson_progress.push({
        lesson_id: new Types.ObjectId(lessonId),
        course_id: new Types.ObjectId(courseId),
        watched_at: now,
        duration: watchedDuration,
        completed,
      });
    }

    // Оновлення прогресу курсу
    const courseStatusIndex = user.my_courses.findIndex(
      (c: any) => c.course_id.toString() === courseId,
    );

    if (courseStatusIndex === -1) {
      // Якщо це перший урок курсу, додаємо його до my_courses
      user.my_courses.push({
        course_id: new Types.ObjectId(courseId),
        started_on: now,
        status: completed ? "completed" : "in_progress",
      });
    } else {
      // Якщо курс вже розпочато, перевіряємо, чи потрібно оновити його статус на "completed"
      if (completed) {
        const totalLessonsCount = await Lesson.countDocuments({
          course_id: new Types.ObjectId(courseId),
        });
        const completedLessonsCount = user.lesson_progress.filter(
          (p: any) => p.course_id.toString() === courseId && p.completed,
        ).length;
        if (completedLessonsCount >= totalLessonsCount) {
          user.my_courses[courseStatusIndex].status = "completed";
        }
      }
    }

    await user.save();

    // Логіка для гейміфікації (якщо потрібно)
    if (completed) {
      // Додайте логіку для нарахування XP та оновлення рівня
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update user progress:", error);
    return { success: false, error: "Failed to update user progress" };
  }
}

export async function updateLessonViews(lessonId: string) {
  try {
    await Lesson.updateOne({ _id: lessonId }, { $inc: { views: 1 } });

    return { success: true };
  } catch (error) {
    console.error("Failed to update lesson views:", error);
    return { success: false, error: "Failed to update lesson views" };
  }
}

export async function isFullCoursePurchased(userID: number, courseID: string) {
  try {
    const user: IUserDatabaseData | null = await User.findOne({ id: userID });

    if (!user) {
      return { success: false };
    }

    const hasPurchased: boolean = (
      user.purchased_courses as IPurchasedCourse[]
    ).some(
      ({ course_id }: IPurchasedCourse): boolean =>
        course_id.toString() === courseID,
    );

    return { success: hasPurchased };
  } catch (error) {
    console.error("❌ Error checking course purchase:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function setLessonDuration(lessonId: string, duration: number) {
  try {
    const result = await Lesson.updateOne(
      { _id: new Types.ObjectId(lessonId) },
      { $set: { video_duration: Math.floor(duration) } },
    );

    if (result.matchedCount === 0) {
      console.error(`Lesson with ID ${lessonId} not found.`);
      return { success: false, error: "Lesson not found" };
    }

    console.log(
      `Duration for lesson ${lessonId} updated to ${Math.floor(duration)}s.`,
    );
    return { success: true };
  } catch (error) {
    console.error("Failed to update lesson duration:", error);
    return { success: false, error: "Failed to update lesson duration" };
  }
}
