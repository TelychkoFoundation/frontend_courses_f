import AdminCoursesTableActions from "./AdminCoursesTableActions";
import AdminCoursesTable from "./AdminCoursesTable";
import styles from "./courses.module.css";

export default function AdminCoursesPage() {
  return (
    <div className={styles.container}>
      <AdminCoursesTableActions />
      <AdminCoursesTable />
    </div>
  );
}
