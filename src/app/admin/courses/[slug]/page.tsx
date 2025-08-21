"use client";

import { useEffect, useTransition } from "react";
import styles from "../course.module.css";
import { useAdmin } from "@/hooks";
import { coursesTitles } from "@/constants";
import { CourseKeyTypes } from "@/typings";
import { useFormStatus } from "react-dom";
import { deleteCourseById } from "@/actions";
import { redirect } from "next/navigation";

export default function AdminCourseViewPage() {
  const { currentCourse, loading, fetchCourse } = useAdmin();
  const [isPending, startTransition] = useTransition();
  const { pending } = useFormStatus();

  useEffect(() => {
    fetchCourse();
    // eslint-disable-[...nextauth]-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className={styles.nonDataMessage}>Завантаження ...</p>;
  }

  if (!currentCourse) {
    return <p className={styles.nonDataMessage}>Курс не знайдено</p>;
  }

  const {
    title,
    price,
    description,
    short_description,
    is_free,
    is_published,
    difficulty,
    outcomes,
    prerequisites,
  } = currentCourse;

  const formAction = async (formData: FormData) => {
    // "use server";
    //
    // const courseKey = formData.get("courseKey") as CourseKeyTypes;
    //
    // const { categories, title } = coursesTitles[courseKey as CourseKeyTypes];
    //
    // const description = formData.get("description")?.toString() || "";
    // const short_description =
    //   formData.get("short_description")?.toString() || "";
    // const price = Number(formData.get("price")) || 0;
    // const is_free = formData.get("is_free") === "true";
    // const is_published = formData.get("is_published") === "true";
    // const difficulty = formData
    //   .get("difficulty")
    //   ?.toString() as CourseDifficultyType;
    // const prerequisites = formData.get("prerequisites")?.toString() || "";
    // const outcomes = formData.get("outcomes")?.toString() || "";
    //
    // const data: ICourseBasePayload = {
    //   courseKey,
    //   title,
    //   description,
    //   short_description,
    //   price,
    //   is_free,
    //   is_published,
    //   difficulty,
    //   categories,
    //   prerequisites,
    //   outcomes,
    //   lessons: [],
    // };
    //
    // const r = await updateCourse(currentCourse.id, data);
    // console.log(r, "sdf");
  };

  const deleteCourse = () => {
    startTransition(async () => {
      if (currentCourse) {
        await deleteCourseById(currentCourse.id);
        redirect("/admin/courses");
      }
    });
  };

  return (
    <form action={formAction} className={styles.form} key={currentCourse.id}>
      <div className={styles.grid}>
        <label>
          Назва курсу
          <select name="courseKey" required defaultValue={title} disabled>
            {(
              Object.keys(coursesTitles) as Array<keyof typeof coursesTitles>
            ).map((key: CourseKeyTypes) => (
              <option key={key} value={coursesTitles[key].courseKey}>
                {coursesTitles[key].title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ціна за повний курс, грн
          <input
            name="price"
            type="number"
            min="0"
            defaultValue={price}
            required
          />
        </label>

        <label>
          Детальний опис курсу
          <textarea name="description" defaultValue={description} required />
        </label>

        <label>
          Короткий опис курсу
          <textarea
            name="short_description"
            defaultValue={short_description}
            required
          />
        </label>

        <label>
          Чи буде курс платний
          <select name="is_free" defaultValue={String(is_free)}>
            <option value="true">Так</option>
            <option value="false">Ні</option>
          </select>
        </label>

        <label>
          Опубліковати
          <select name="is_published" defaultValue={String(is_published)}>
            <option value="false">Ні</option>
            <option value="true">Так</option>
          </select>
        </label>

        <label>
          Рівень складності
          <select
            name="difficulty"
            defaultValue={difficulty || "beginner"}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Необхідні знання
          <textarea
            name="prerequisites"
            defaultValue={prerequisites}
            required
          />
        </label>

        <label>
          Результати
          <textarea name="outcomes" defaultValue={outcomes} required />
        </label>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.remove} onClick={deleteCourse}>
          {isPending ? "Видаляю..." : "Видалити"}
        </button>
        <div className={styles.nonDeleteButtons}>
          <button type="submit" disabled={pending} className={styles.submit}>
            {pending ? "Оновлюю..." : "Оновити"}
          </button>
        </div>
      </div>
    </form>
  );
}
