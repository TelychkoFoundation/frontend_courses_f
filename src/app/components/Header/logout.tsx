"use client";

import styles from "./index.module.css";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "@/hooks";
import { logout } from "@/lib";
import { redirect } from "next/navigation";

export default function Logout() {
  const { setUser } = useUser();

  const handleLogout = async () => {
    setUser(null);
    await logout();
    redirect("/");
  };

  return (
    <button onClick={handleLogout} className={styles.dropdownItem}>
      <FiLogOut size={16} color="#e00" />
      <span className={styles.logout}>Вийти</span>
    </button>
  );
}
