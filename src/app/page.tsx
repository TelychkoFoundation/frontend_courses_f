import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import TelegramLogin from "./lib/telegram-login";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Курси фронтенду</h1>
        <ol>
          <li>
            Обирай веб технологію
          </li>
          <li>Обирай урок та починай навчання</li>
        </ol>

        <div className={styles.ctas}>
          <TelegramLogin />
          <Link
            href="/tutorial"
            className={styles.secondary}
          >
            Як проходить навчання
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
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
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
