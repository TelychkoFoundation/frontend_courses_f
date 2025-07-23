"use client";

import styles from "../course.module.css";
// import { deleteCourseById } from "@/actions";
import { useTransition } from "react";
import { redirect } from "next/navigation";

export default function DeleteButton({ slug }: { slug: string }) {
  const [isPending, startTransition] = useTransition();

  const deleteCourse = () => {
    startTransition(async () => {
      // await deleteCourseById(slug);
      redirect("/admin/courses");
    });
  };

  return (
    <button type="button" className={styles.remove} onClick={deleteCourse}>
      {isPending ? "Видаляю..." : "Видалити"}
    </button>
  );
}
