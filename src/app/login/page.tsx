import styles from "./page.module.css";
import Link from "next/link";
import AuthButton from "./button";
import { FiLinkedin, FiInstagram } from "react-icons/fi";
import { RiTelegram2Line } from "react-icons/ri";

export default async function LoginPage() {
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
          <div className={styles.secondary}>
            <AuthButton />
          </div>
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
          <FiLinkedin size={16} />
          Linkedin
        </a>
        <a
          href="https://www.instagram.com/vitaliitelychko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiInstagram size={16} />
          Instagram
        </a>
        <a
          href="https://t.me/vitalii_telychko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiTelegram2Line size={16} />
          Telegram
        </a>
      </footer>
    </div>
  );
}
