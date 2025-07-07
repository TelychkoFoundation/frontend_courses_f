"use client";

import styles from "./page.module.css";
import { logout } from "../lib/deleteActions";
import { useUser } from "../hooks/useUser";

export default function Page() {
  const { setUser } = useUser();

  const logoutHandler = async () => {
    setUser(null);
    await logout();
  };

  return (
    <div className={styles.page}>
      Courses <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}
