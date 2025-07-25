"use client";

import styles from "./index.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ServicesLink = () => {
  const pathName = usePathname();

  return (
    <Link
      href="/services"
      className={`${styles.link} ${pathName === "/services" ? styles.underline : ""}`}
    >
      Послуги
    </Link>
  );
};
