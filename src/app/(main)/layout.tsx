import { ReactNode, Suspense } from "react";
import { Header } from "@/components";
import { DrawerProvider, CoursesProvider } from "@/context";
import styles from "./layout.module.css";

export default function CoursesLayout({ children }: { children: ReactNode }) {
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
