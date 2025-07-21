import { FaHome } from "react-icons/fa";
import styles from "./index.module.css";
import Link from "next/link";
import { TabsWrapper } from "./tabs";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumbs}>
        <Link href="/courses?filter=all">
          <FaHome size={28} />
        </Link>
      </div>
      <TabsWrapper />
    </header>
  );
}
