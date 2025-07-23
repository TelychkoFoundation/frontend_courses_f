"use client";

import { FiLogOut } from "react-icons/fi";
import { useUser } from "@/hooks";
// import { deleteSession } from "@/lib";
import { redirect } from "next/navigation";
import styles from "./index.module.css";

export default function Logout() {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    // await deleteSession();
    redirect("/");
  };

  return (
    <button onClick={handleLogout} className={styles.dropdownItem}>
      <FiLogOut size={16} color="#e00" />
      <span className={styles.logout}>Вийти</span>
    </button>
  );
}
