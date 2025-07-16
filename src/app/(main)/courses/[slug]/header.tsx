import { Suspense } from "react";
import Link from "next/link";
import { LuTableOfContents } from "react-icons/lu";

import { FaHome } from "react-icons/fa";
import styles from "./page.module.css";

export async function CourseHeader() {
  return (
    <Suspense>
      <header className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link href="/courses?filter=all">
            <FaHome size={24} />
          </Link>
          <span>-</span>
          <strong>HTML Basics</strong>
        </div>
        <LuTableOfContents size={24} />
      </header>
    </Suspense>
  );
}
