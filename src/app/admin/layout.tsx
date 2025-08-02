"use client";

import { AdminProvider } from "@/context";
import AdminHeader from "./header";
import SubHeader from "./courses/actions";
import styles from "./layout.module.css";

export default function AdminCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminHeader />
      <div className={styles.container}>
        <SubHeader />
        {children}
      </div>
    </AdminProvider>
  );
}
