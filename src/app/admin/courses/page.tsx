"use client";

import AdminCoursesTableActions from "./AdminCoursesTableActions";
import AdminCoursesTable from "./AdminCoursesTable";
import styles from "./courses.module.css";
import { Suspense } from "react";

export default function AdminCoursesPage() {
  return (
    <Suspense>
      <div className={styles.container}>
        <AdminCoursesTableActions />
        <AdminCoursesTable />
      </div>
    </Suspense>
  );
}
