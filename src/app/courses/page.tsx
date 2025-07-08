"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { logout, deleteUser } from "../lib/deleteActions";
import { useUser } from "../hooks/useUser";

export default function Page() {
  const { setUser } = useUser();
  const router = useRouter();

  const logoutHandler = async () => {
    setUser(null);
    await logout();
    router.push("/");
  };

  const deleteUserHandler = async () => {
    setUser(null);
    await deleteUser();
    router.push("/");
  };

  return (
    <div className={styles.page}>
      Courses <button onClick={logoutHandler}>Logout</button>
      <button onClick={deleteUserHandler}>Delete user</button>
    </div>
  );
}
