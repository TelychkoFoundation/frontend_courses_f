"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { deleteUser } from "../../lib/deleteActions";
import { useUser } from "../../hooks/useUser";

export default function Page() {
  const { setUser } = useUser();
  const router = useRouter();

  const deleteUserHandler = async () => {
    setUser(null);
    await deleteUser();
    router.push("/");
  };

  return (
    <div className={styles.page}>
      Courses
      <button onClick={deleteUserHandler}>Delete user</button>
    </div>
  );
}
