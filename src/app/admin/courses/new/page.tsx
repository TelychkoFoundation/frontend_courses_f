import Link from "next/link";
import { createCourse } from "../../../lib/postActions";
import styles from "../course.module.css";
import { SubmitButton } from "./SubmitButton";
import { redirect } from "next/navigation";

export default function AdminCoursesNewPage() {
  const formAction = async (formData: FormData) => {
    "use server";

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = Number(formData.get("price")) || 0;
    const is_free = formData.get("is_free") === "true";
    const is_published = formData.get("is_published") === "true";
    const difficulty = formData.get("difficulty")?.toString() || "beginner";
    const category = formData.get("category")?.toString() || "";
    const prerequisites = formData.get("prerequisites")?.toString() || "";
    const thumbnail = formData.get("thumbnail")?.toString() || "";
    const outcomes = formData.get("outcomes")?.toString().split(",") || [];

    const data = {
      title,
      description,
      price,
      is_free,
      is_published,
      difficulty,
      category,
      prerequisites,
      thumbnail,
      outcomes,
      lessons: [],
      recommended_order: [],
    };

    const result = await createCourse(data);

    if (result.success) {
      redirect("/admin/courses");
    }
  };

  return (
    <form action={formAction} className={styles.form}>
      <h2>Hовий курс</h2>

      <div className={styles.grid}>
        <label>
          Назва курсу
          <input name="title" required />
        </label>

        <label>
          Ціна за повний курс
          <input name="price" type="number" min="0" required />
        </label>

        <label>
          Опис курсу
          <textarea name="description" required />
        </label>

        <label>
          Чи буде курс платний
          <select name="is_free">
            <option value="true">Так</option>
            <option value="false">Ні</option>
          </select>
        </label>

        <label>
          Опубліковати
          <select name="is_published">
            <option value="false">Ні</option>
            <option value="true">Так</option>
          </select>
        </label>

        <label>
          Рівень складності
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
          Необхідні знання
          <input name="prerequisites" required />
        </label>

        <label>
          Результати (через кому)
          <input name="outcomes" required />
        </label>

        <label>
          Посилання на обкладинку
          <input name="thumbnail" type="url" />
        </label>
      </div>

      <div className={styles.buttons}>
        <Link href="/admin/courses" className={styles.backBtn}>
          ← Назад
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
