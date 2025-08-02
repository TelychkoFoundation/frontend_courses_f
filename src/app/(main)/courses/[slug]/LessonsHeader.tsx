"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { LuTableOfContents } from "react-icons/lu";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaHome } from "react-icons/fa";
import styles from "./page.module.css";
import { useCourses, useDrawer } from "@/hooks";
import { QueryDrawerType } from "@/typings";

export default function LessonsHeader() {
  const { openDrawerWithQueryString } = useDrawer();
  const { currentCourse } = useCourses();

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
      <div className={styles.contents} onClick={openContentsModal}>
        <LuTableOfContents size={28} />
      </div>
    </header>
  );
}
