import styles from "../index.module.css";
import { FiRefreshCcw } from "react-icons/fi";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { useAdmin } from "@/hooks";

export default function CoursesLinks() {
  const { fetchCourses } = useAdmin();

  return (
    <>
      <button
        className={`${styles.iconButton} ${styles.refresh}`}
        title="Оновити"
        onClick={fetchCourses}
      >
        <FiRefreshCcw size={18} />
      </button>
      <Link href="/admin/courses/new" className={styles.primary}>
        <IoMdAdd /> Додати курс
      </Link>
    </>
  );
}
