"use server";

import { Lesson, Course, User } from "@/models";
import { ICreateLessonData, ILesson } from "@/typings";
import { deleteLessonFromS3 } from "./s3";

export const createLesson = async (lessonData: ICreateLessonData) => {
  try {
    const lesson = await Lesson.create({
      ...lessonData,
      views: 0,
      reviews: [],
      related_lessons: [],
    });

    const courseUpdateResult = await Course.findByIdAndUpdate(
      lessonData.course_id,
      { $push: { lessons: lesson._id } },
      { new: true },
    );

    if (!courseUpdateResult) {
      return { success: false, error: "Курс не найден для обновления." };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getLessonById = async (id: string) => {
  try {
    const lesson = await Lesson.findById(id).lean();

    if (!lesson) {
      return { success: false, error: "Урок не знайдено" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(lesson)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getLessonsForCourse = async (course_id: string) => {
  try {
    const lessons = await Lesson.find({ course_id }).sort({
      order: 1,
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(lessons)),
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export async function deleteLessonById(id: string) {
  try {
    const lesson: ILesson | null = await Lesson.findById(id);

    if (!lesson) {
      return { success: false, error: "Урок не знайдено" };
    }

    const { video_key } = lesson;

    if (video_key) {
      const folderPath: string = video_key.slice(
        0,
        video_key.lastIndexOf("/") + 1,
      );
      await deleteLessonFromS3(folderPath);
    }

    await Course.updateMany({ lessons: id }, { $pull: { lessons: id } });

    await User.updateMany(
      { "purchased_lessons.lesson_id": id },
      { $pull: { purchased_lessons: { lesson_id: id } } },
    );

    await User.updateMany(
      { "lesson_progress.lesson_id": id },
      { $pull: { lesson_progress: { lesson_id: id } } },
    );

    await User.updateMany(
      { "reminders.lesson_id": id },
      { $pull: { reminders: { lesson_id: id } } },
    );

    await Lesson.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateLesson(id: string, data: ICreateLessonData) {
  try {
    const updated = await Lesson.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return { success: false, error: "Урок не знайдено" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
