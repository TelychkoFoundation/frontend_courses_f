import Link from "next/link";
import styles from "../course.module.css";
import UpdateButton from "./UpdateButton";
import { updateCourse, getCurrentCourse } from "@/lib";
import DeleteButton from "./DeleteButton";
import {
  CourseDifficultyType,
  CourseKeyTypes,
  ICourseBasePayload,
} from "@/typings";
import { coursesTitles } from "@/constants";

export default async function EditForm({ slug }: { slug: string }) {
  const response = await getCurrentCourse(slug as CourseKeyTypes);

  if (!response.success) {
    return <div>Курс не знайдено</div>;
  }

  const course = response.data;

  const formAction = async (formData: FormData) => {
    "use server";

    const courseKey = formData.get("courseKey") as CourseKeyTypes;

    const { categories, title } = coursesTitles[courseKey as CourseKeyTypes];

    console.log(categories, courseKey, "!!!");

    const description = formData.get("description")?.toString() || "";
    const short_description =
      formData.get("short_description")?.toString() || "";
    const price = Number(formData.get("price")) || 0;
    const is_free = formData.get("is_free") === "true";
    const is_published = formData.get("is_published") === "true";
    const difficulty = formData
      .get("difficulty")
      ?.toString() as CourseDifficultyType;
    const prerequisites = formData.get("prerequisites")?.toString() || "";
    const outcomes = formData.get("outcomes")?.toString() || "";

    const data: ICourseBasePayload = {
      courseKey,
      title,
      description,
      short_description,
      price,
      is_free,
      is_published,
      difficulty,
      categories,
      prerequisites,
      outcomes,
      lessons: [],
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
          <select name="courseKey" required defaultValue={course.title}>
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
            defaultValue={course.price}
            required
          />
        </label>

        <label>
          Детальний опис курсу
          <textarea
            name="description"
            defaultValue={course.description}
            required
          />
        </label>

        <label>
          Короткий опис курсу
          <textarea
            name="short_description"
            defaultValue={course.short_description}
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
          Необхідні знання
          <textarea
            name="prerequisites"
            defaultValue={course.prerequisites}
            required
          />
        </label>

        <label>
          Результати
          <textarea name="outcomes" defaultValue={course.outcomes} required />
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
