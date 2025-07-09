import styles from "./courses.module.css";
import TableData from "./TableData";
import AdminTableHeader from "./TableHeader";

export default async function AdminCoursesPage() {
  return (
    <div className={styles.container}>
      <AdminTableHeader />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Уроки</th>
            <th>Категорія</th>
            <th>Статус</th>
            <th>Створено</th>
            <th>Дії</th>
          </tr>
        </thead>
        <TableData />
      </table>
    </div>
  );
}
