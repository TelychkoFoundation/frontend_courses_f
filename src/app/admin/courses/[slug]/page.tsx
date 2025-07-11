import { getAdminCourse } from "../../../lib/getActions";
import Link from "next/link";
import styles from "../course.module.css";
import UpdateButton from "./UpdateButton";
import { updateCourse } from "../../../lib/updateActions";
import DeleteButton from "./DeleteButton";

export default async function AdminCourseViewPage({ params }: any) {
  const { slug } = await params;

  const response = await getAdminCourse(slug);

  if (!response.success) {
    return <div>Курс не знайдено</div>;
  }

  const course = response.data;

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

    const r = await updateCourse(slug, data);
    console.log(r, "sdf");
  };

  return (
    <form action={formAction} className={styles.form} key={slug}>
      <h2>{course.title}</h2>

      <div className={styles.grid}>
        <label>
          Назва курсу
          <input name="title" defaultValue={course.title} required />
        </label>

        <label>
          Ціна за повний курс
          <input
            name="price"
            type="number"
            min="0"
            defaultValue={course.price}
            required
          />
        </label>

        <label>
          Опис курсу
          <textarea
            name="description"
            defaultValue={course.description}
            required
          />
        </label>

        <label>
          Чи буде курс платний
          <select name="is_free" defaultValue={String(course.is_free)}>
            <option value="true">Так</option>
            <option value="false">Ні</option>
          </select>
        </label>

        <label>
          Опубліковати
          <select
            name="is_published"
            defaultValue={String(course.is_published)}
          >
            <option value="false">Ні</option>
            <option value="true">Так</option>
          </select>
        </label>

        <label>
          Рівень складності
          <select
            name="difficulty"
            defaultValue={course.difficulty || "beginner"}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Категорія
          <input name="category" defaultValue={course.category} required />
        </label>

        <label>
          Необхідні знання
          <input
            name="prerequisites"
            defaultValue={course.prerequisites}
            required
          />
        </label>

        <label>
          Результати (через кому)
          <input
            name="outcomes"
            defaultValue={course.outcomes.join(", ")}
            required
          />
        </label>

        <label>
          Посилання на обкладинку
          <input name="thumbnail" type="url" defaultValue={course.thumbnail} />
        </label>
      </div>

      <div className={styles.buttons}>
        <DeleteButton slug={slug} />
        <div className={styles.nonDeleteButtons}>
          <Link href="/admin/courses" className={styles.backBtn}>
            ← Назад
          </Link>
          <UpdateButton />
        </div>
      </div>
    </form>
  );
}
