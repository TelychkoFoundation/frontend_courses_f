import AdminHeader from "./header";
import { AdminProvider } from "../context";
import styles from "./layout.module.css";
import ExitAdminButton from "./courses/ExitAdminButton";

export default function AdminCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminHeader />
      <div className={styles.container}>
        {children}
        <ExitAdminButton />
      </div>
    </AdminProvider>
  );
}
