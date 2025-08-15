"use client";

import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "@/actions";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className={styles.dropdownItem}>
      <FiLogOut size={16} color="#e00" />
      <span className={styles.logout}>Вийти</span>
    </button>
  );
}
