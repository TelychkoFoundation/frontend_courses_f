import Tabs from "../../components/Tabs";
import { FaHome } from "react-icons/fa";
import styles from "./layout.module.css";
import Link from "next/link";

export async function CoursesHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Link href="/courses?filter=all">
          <FaHome size={28} />
        </Link>
      </div>
      <Tabs
        values={[
          { id: "all", name: "Всі курси" },
          { id: "my", name: "Мої курси" },
        ]}
      />
    </header>
  );
}
