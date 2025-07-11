"use client";

import styles from "./courses.module.css";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useAdmin } from "../../hooks/useAdmin";

export default memo(function AdminCoursesTableRow({
  index,
}: {
  index: number;
}) {
  const router = useRouter();
  const { courses } = useAdmin();
  const {
    id,
    title,
    price,
    is_free,
    lessons,
    category,
    createdAt,
    is_published,
  } = courses[index];

  const handleActiveCourse = (id: string) => {
    router.push(`/admin/courses/${id}`);
  };

  return (
    <tr key={id} onClick={() => handleActiveCourse(id)} className={styles.row}>
      <td>{index + 1}</td>
      <td title={title}>{title}</td>
      <td title={String(price)}>{is_free ? "Безкоштовний" : `${price}₴`}</td>
      <td>{lessons.length}</td>
      <td>{category || "—"}</td>
      <td>{is_published ? "✅" : "❌"}</td>
      <td>{new Date(createdAt).toLocaleDateString("uk-UA")}</td>
    </tr>
  );
});
