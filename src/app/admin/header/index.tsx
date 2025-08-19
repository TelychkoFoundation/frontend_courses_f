"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div>адмінка</div>

      <nav className={styles.nav}>
        <Link
          href="/admin/courses"
          className={`${styles.link} ${
            pathname.startsWith("/admin/courses") ? styles.active : ""
          }`}
        >
          Курси
        </Link>
        <Link
          href="/admin/metrics"
          className={`${styles.link} ${
            pathname.startsWith("/admin/metrics") ? styles.active : ""
          }`}
        >
          Метрики
        </Link>
        <Link href="/courses?filter=all" className={styles.link}>
          логаут
        </Link>
      </nav>
    </header>
  );
}
