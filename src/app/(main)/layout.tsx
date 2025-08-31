"use client";

import { ReactNode } from "react";
import { useScrollToTop } from "@/hooks";
import { LessonsProvider } from "@/context";
import Header from "./Header";
import styles from "./layout.module.css";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  useScrollToTop();

  return (
    <LessonsProvider>
      <main className={styles.container}>
        <Header />
        <div>{children}</div>
      </main>
    </LessonsProvider>
  );
}
