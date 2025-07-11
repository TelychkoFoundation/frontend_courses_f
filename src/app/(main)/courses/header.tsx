import { Suspense } from "react";
import Link from "next/link";
import Tabs from "../../components/Tabs";
import { FaHome } from "react-icons/fa";
import styles from "./layout.module.css";

export async function CoursesHeader() {
  return (
    <Suspense fallback={<p>Завантаження...</p>}>
      <header className={styles.header}>
        <FaHome size={24} />
        <Tabs
          values={[
            { id: "all", name: "Всі курси" },
            { id: "my", name: "Мої курси" },
          ]}
        />
      </header>
    </Suspense>
  );
}
