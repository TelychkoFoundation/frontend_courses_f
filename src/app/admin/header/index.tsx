"use client";

import Link from "next/link";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div>
        <MdOutlineAdminPanelSettings size={40} />
      </div>

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
        <Link href="/courses" className={styles.link}>
          <CiLogout size={24} />
        </Link>
      </nav>
    </header>
  );
}
