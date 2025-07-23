import { ReactNode, Suspense } from "react";
import { Header } from "@/components";
import styles from "./layout.module.css";
import { CoursesProvider, DrawerProvider, UserProvider } from "@/context";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense>
      <UserProvider>
        <CoursesProvider>
          <DrawerProvider>
            <Header />
            <main className={styles.container}>{children}</main>
          </DrawerProvider>
        </CoursesProvider>
      </UserProvider>
    </Suspense>
  );
}
