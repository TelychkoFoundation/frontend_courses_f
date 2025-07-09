"use client";

import { useState } from "react";
import { createCourse } from "../../../lib/postActions";
import styles from "../courses.module.css";

export default function AdminCoursesNewPage() {
  const [loading, setLoading] = useState(false);

  const handleCourseForm = async (formData: FormData) => {
    // Окремо беремо поля з FormData
    const title = formData.get("title");
    const description = formData.get("description");

    // Масиви - lessons[], recommended_order[], outcomes[]
    // formData.getAll повертає масив рядків або пустий масив
    const lessonsRaw = formData.getAll("lessons[]"); // масив рядків
    const recommendedOrderRaw = formData.getAll("recommended_order[]");
    const outcomesRaw = formData.getAll("outcomes[]");

    // Число
    const priceRaw = formData.get("price");

    // boolean - чекбокси. Якщо є - true, якщо ні - false
    const isFree = formData.has("is_free");
    const isPublished = formData.has("is_published");

    // enum
    const difficulty = formData.get("difficulty");

    // рядкові поля
    const category = formData.get("category");
    const prerequisites = formData.get("prerequisites");
    const thumbnail = formData.get("thumbnail");

    // Парсимо числові поля
    const price = priceRaw ? Number(priceRaw) : 0;

    // Приводимо масиви до ObjectId[] (припускаємо, що вони рядки id)
    // Якщо використовуєш mongoose, можеш робити так:
    // import { Types } from 'mongoose';
    // const lessons = lessonsRaw.map(id => new Types.ObjectId(id));
    // Але якщо це просто рядки - залишимо так:
    const lessons = lessonsRaw as string[];
    const recommended_order = recommendedOrderRaw as string[];
    const outcomes = outcomesRaw as string[];

    // Перевірки, валідація і т.д. можна додати далі

    // Повертаємо об’єкт для створення курсу
    return {
      title: title as string,
      description: description as string,
      lessons,
      recommended_order,
      price,
      is_free: isFree,
      is_published: isPublished,
      difficulty: difficulty as "beginner" | "intermediate" | "advanced" | null,
      category: category as string | null,
      prerequisites: prerequisites as string | null,
      outcomes,
      thumbnail: thumbnail as string | null,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = await handleCourseForm(formData);
    const res = await createCourse(data);

    console.log(res);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Створити новий курс</h2>

      <label>
        Назва курсу:
        <input name="title" required />
      </label>

      <label>
        Опис:
        <textarea name="description" required />
      </label>

      <label>
        Ціна:
        <input name="price" type="number" min="0" required />
      </label>

      <label>
        Безкоштовний?
        <select name="is_free">
          <option value="false">Ні</option>
          <option value="true">Так</option>
        </select>
      </label>

      <label>
        Опубліковано?
        <select name="is_published">
          <option value="false">Ні</option>
          <option value="true">Так</option>
        </select>
      </label>

      <label>
        Рівень складності:
        <select name="difficulty" required>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </label>

      <label>
        Категорія:
        <input name="category" required />
      </label>

      <label>
        Необхідні знання:
        <input name="prerequisites" required />
      </label>

      <label>
        Результати (через кому):
        <input name="outcomes" required />
      </label>

      <label>
        Посилання на обкладинку:
        <input name="thumbnail" type="url" required />
      </label>

      <button type="submit" disabled={loading} className={styles.submit}>
        {loading ? "Створення..." : "Створити курс"}
      </button>
    </form>
  );
}
