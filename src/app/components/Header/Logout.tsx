"use client";

import { LogoutIcon } from "@/images";
import { signOut } from "next-auth/react";
import styles from "./index.module.css";

export default function Logout() {
  return (
    <li
      onClick={() => signOut({ redirectTo: "/" })}
      className={styles.dropdownItemLogout}
    >
      <LogoutIcon />
      <span className={styles.dropdownItemNameLogout}>Вийти</span>
    </li>
  );
}
