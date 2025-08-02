import { ReactNode, Suspense } from "react";
import { Header } from "@/components";
import styles from "./layout.module.css";
import {
  CoursesProvider,
  DrawerProvider,
  UserProvider,
  LessonsProvider,
} from "@/context";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense>
      <UserProvider>
        <DrawerProvider>
          <CoursesProvider>
            <LessonsProvider>
              <Header />
              <main className={styles.container}>{children}</main>
            </LessonsProvider>
          </CoursesProvider>
        </DrawerProvider>
      </UserProvider>
    </Suspense>
  );
}
