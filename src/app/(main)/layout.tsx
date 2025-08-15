import { ReactNode } from "react";
import { CoursesProvider, LessonsProvider } from "@/context";
import Header from "./Header";
import styles from "./layout.module.css";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CoursesProvider>
      <LessonsProvider>
        <main className={styles.container}>
          <Header />
          <div>{children}</div>
        </main>
      </LessonsProvider>
    </CoursesProvider>
  );
}
