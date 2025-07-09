"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./courses.module.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useAdmin } from "../../hooks/useAdmin";
import { ICourse } from "../../models/Course";
import { FiRefreshCcw } from "react-icons/fi";

export default function AdminCoursesPage() {
  const { courses, deleteCourse, setActiveCourse, fetchCourses } = useAdmin();

  const router = useRouter();

  const handleActiveCourse = (course: ICourse) => {
    setActiveCourse(course);
    router.push(`/admin/courses/${course.id}`);
  };

  const handleEditCourse = (id: string) => {
    router.push(`/admin/courses/edit/${id}`);
  };

  const handleRemoveCourse = async (id: string) => {
    await deleteCourse(id);
  };

  console.log(courses, "courses");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Курси</h1>
        <div className={styles.headerActions}>
          <button
            className={`${styles.iconButton} ${styles.refresh}`}
            title="Оновити"
            onClick={fetchCourses}
          >
            <FiRefreshCcw size={20} />
          </button>
          <Link href="/admin/courses/new" className={styles.createBtn}>
            + Створити курс
          </Link>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Уроки</th>
            <th>Категорія</th>
            <th>Статус</th>
            <th>Створено</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr
              key={course.id}
              onClick={() => handleActiveCourse(course)}
              className={styles.row}
            >
              <td title={course.title}>{course.title}</td>
              <td title={`${course.price}`}>
                {course.is_free ? "Безкоштовний" : `${course.price}₴`}
              </td>
              <td>{course.lessons.length}</td>
              <td>{course.category || "—"}</td>
              <td>{course.is_published ? "✅" : "❌"}</td>
              <td>{new Date(course.createdAt).toLocaleDateString("uk-UA")}</td>
              <td>
                <div>
                  <button
                    className={`${styles.iconButton} ${styles.edit}`}
                    title="Редагувати"
                    onClick={event => {
                      event.stopPropagation();
                      handleEditCourse(course.id);
                    }}
                  >
                    <CiEdit size={20} />
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.delete}`}
                    title="Видалити"
                    onClick={event => {
                      event.stopPropagation();
                      handleRemoveCourse(course.id);
                    }}
                  >
                    <CiTrash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
