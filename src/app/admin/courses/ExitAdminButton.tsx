"use client";

import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import styles from "./courses.module.css";

export default function ExitAdminButton() {
  const router = useRouter();

  const handleExit = () => {
    router.push("/courses"); // або "/", залежно від твоєї структури
  };

  return (
    <button onClick={handleExit} className={styles.exitButton}>
      <CiLogout size={16} />
      <span>Назад до застосунку</span>
    </button>
  );
}
