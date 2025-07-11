import Tabs from "../../components/Tabs";
import { FaHome } from "react-icons/fa";
import styles from "./layout.module.css";

export async function CoursesHeader() {
  return (
    <header className={styles.header}>
      <FaHome size={24} />
      <Tabs
        values={[
          { id: "all", name: "Всі курси" },
          { id: "my", name: "Мої курси" },
        ]}
      />
    </header>
  );
}
