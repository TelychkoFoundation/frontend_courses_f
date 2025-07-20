"use client";

import { Suspense } from "react";
import AdminHeader from "./header";
import { AdminProvider } from "@/context";
import styles from "./layout.module.css";

export default function AdminCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <Suspense>
        <AdminHeader />
        <div className={styles.container}>{children}</div>
      </Suspense>
    </AdminProvider>
  );
}
