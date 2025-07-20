import { Header } from "@/components";
import { DrawerProvider, CoursesProvider } from "@/context";
import styles from "./layout.module.css";
import { Suspense } from "react";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <CoursesProvider>
        <DrawerProvider>
          <Header />
          <main className={styles.container}>{children}</main>
        </DrawerProvider>
      </CoursesProvider>
    </Suspense>
  );
}
