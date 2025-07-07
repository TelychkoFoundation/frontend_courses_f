import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Auth from "./auth/auth";

export default function RootPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Курси фронтенду</h1>
        <ol>
          <li>Обирай веб технологію</li>
          <li>Обирай урок та починай навчання</li>
          <li>Ментор буде поруч</li>
        </ol>

        <div className={styles.ctas}>
          <Auth />
          <Link href="/tutorial" className={styles.secondary}>
            Як проходить навчання
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/vitaliitelychko/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Linkedin
        </a>
        <a
          href="https://www.instagram.com/vitaliitelychko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Instagram
        </a>
        <a
          href="https://t.me/vitalii_telychko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Telegram
        </a>
      </footer>
    </div>
  );
}
