import { ReactNode } from "react";
import { LessonsProvider } from "@/context";
import Header from "./Header";
import styles from "./layout.module.css";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LessonsProvider>
      <main className={styles.container}>
        <Header />
        <div>{children}</div>
      </main>
    </LessonsProvider>
  );
}
