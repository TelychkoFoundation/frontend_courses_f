import Link from "next/link";
import styles from "./not-found.module.css";

export default async function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Сторінку не знайдено</h2>
      </div>
      <Link href="/courses" className={styles.back}>
        До курсів
      </Link>
    </div>
  );
}
