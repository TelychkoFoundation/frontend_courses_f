"use client";

import { LogoutIcon } from "@/images";
import styles from "./index.module.css";
import { useAuth } from "@/hooks";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <li onClick={logout} className={styles.dropdownItemLogout}>
      <LogoutIcon />
      <span className={styles.dropdownItemNameLogout}>Вийти</span>
    </li>
  );
}
