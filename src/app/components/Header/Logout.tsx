"use client";

import { LogoutIcon } from "@/images";
import { signOut } from "next-auth/react";
import styles from "./index.module.css";

export default function Logout({
  setIsAuthenticatedAction,
}: {
  setIsAuthenticatedAction: (isAuthenticated: boolean) => void;
}) {
  return (
    <li
      onClick={async () => {
        setIsAuthenticatedAction(false);
        await signOut({ redirectTo: "/" });
      }}
      className={styles.dropdownItemLogout}
    >
      <LogoutIcon />
      <span className={styles.dropdownItemNameLogout}>Вийти</span>
    </li>
  );
}
