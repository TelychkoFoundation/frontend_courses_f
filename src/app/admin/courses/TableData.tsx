"use client";

import { useEffect } from "react";
import styles from "./courses.module.css";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useAdmin } from "../../hooks/useAdmin";
import { ICourse } from "../../models/Course";
import { useRouter } from "next/navigation";
import DeleteCourse from "./DeleteCourse";

export default function TableData() {
  const router = useRouter();
  const { deleteCourse, setActiveCourse, courses, fetchCourses } = useAdmin();

  useEffect(() => {
    fetchCourses();
  }, []);

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

  return (
    <tbody>
      {courses.map((course, index) => (
        <tr
          key={course.id}
          onClick={() => handleActiveCourse(course)}
          className={styles.row}
        >
          <td>{index + 1}</td>
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
              <DeleteCourse id={course.id} title={course.title} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
