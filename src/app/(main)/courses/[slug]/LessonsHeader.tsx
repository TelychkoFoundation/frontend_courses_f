"use client";

import { MouseEvent, useTransition } from "react";
import Link from "next/link";
import { LuTableOfContents } from "react-icons/lu";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaHome } from "react-icons/fa";
import styles from "./page.module.css";
import { useCourses, useDrawer } from "@/hooks";
import { ICourse, QueryDrawerType } from "@/typings";
import { createPaymentForCourse } from "@/actions";

export default function LessonsHeader() {
  const { openDrawerWithQueryString } = useDrawer();
  const { currentCourse } = useCourses();
  const [isPending, startTransition] = useTransition();

  const payForCourse = async () => {
    startTransition(() =>
      createPaymentForCourse(currentCourse as ICourse, window.location.href),
    );
  };

  const openContentsModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    openDrawerWithQueryString(QueryDrawerType.CourseContentsDrawer, "topics");
  };

  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Link href="/courses?filter=all">
          <FaHome size={28} />
        </Link>
        <TfiLayoutLineSolid />
        <strong className={styles.title}>{currentCourse?.title}</strong>
      </div>
      <button className={styles.buyButton} onClick={payForCourse}>
        {isPending ? "Очікуємо..." : "Купити весь курс"}
      </button>
      <div className={styles.contents} onClick={openContentsModal}>
        <LuTableOfContents size={28} />
      </div>
    </header>
  );
}
