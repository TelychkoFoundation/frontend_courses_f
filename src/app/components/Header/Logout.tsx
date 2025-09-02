"use client";

import { ReactElement } from "react";
import { LogoutIcon } from "@/images";
import { signOut } from "next-auth/react";
import styles from "./index.module.css";

export default function Logout({ icon }: { icon?: ReactElement | undefined }) {
  return (
    <li
      onClick={() => signOut({ redirectTo: "/" })}
      className={styles.dropdownItemLogout}
    >
      <LogoutIcon />
      <span className={styles.dropdownItemNameLogout}>Вийти</span>
      {icon}
    </li>
  );
}
