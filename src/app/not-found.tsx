"use client";

import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Сторінку не знайдено</h2>
      </div>
      <button onClick={() => router.back()} className={styles.back}>
        Назад
      </button>
    </div>
  );
}
