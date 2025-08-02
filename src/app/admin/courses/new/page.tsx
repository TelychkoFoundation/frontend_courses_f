"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { createCourse } from "@/actions";
import { coursesTitles } from "@/constants";
import { CourseKeyTypes, ICourseBasePayload } from "@/typings";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

export default function AdminCoursesNewPage() {
  const { pending } = useFormStatus();

  const formAction = async (formData: FormData) => {
    // "use server";
    //
    // const courseKey = formData.get("courseKey") as CourseKeyTypes;
    //
    // const {
    //   title = "",
    //   description,
    //   short_description,
    //   difficulty,
    //   categories,
    //   prerequisites,
    //   outcomes,
    // } = coursesTitles[courseKey as CourseKeyTypes];
    //
    // const price = Number(formData.get("price")) || 0;
    // const is_free = formData.get("is_free") === "true";
    // const is_published = formData.get("is_published") === "true";
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
    // const result = await createCourse(data);
    //
    // if (result.success) {
    //   redirect("/admin/courses");
    // }
  };

  return (
    <form action={formAction} className={styles.form}>
      <div className={styles.grid}>
        <label>
          Назва курсу
          <select name="courseKey" required>
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
          <input name="price" type="number" min="0" />
        </label>

        <label>
          Чи буде курс платний
          <select name="is_free">
            <option value="false">Ні</option>
            <option value="true">Так</option>
          </select>
        </label>

        <label>
          Опубліковати
          <select name="is_published">
            <option value="false">Ні</option>
            <option value="true">Так</option>
          </select>
        </label>
      </div>

      <button type="submit" disabled={pending} className={styles.submit}>
        {pending ? "Створення..." : "Створити"}
      </button>
    </form>
  );
}
