import { ReactNode, Suspense } from "react";
import { Header } from "@/components";
import styles from "./layout.module.css";
import { CoursesProvider, DrawerProvider, UserProvider } from "@/context";
import { verifySession } from "@/lib";
import { redirect } from "next/navigation";

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await verifySession();

  if (!session?.userID) {
    redirect("/login");
  }

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
