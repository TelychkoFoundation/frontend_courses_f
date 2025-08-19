import Link from "next/link";
import { InstagramIcon, LinkedinIcon, TelegramLogoIcon } from "@/images";
import styles from "./index.module.css";

export default function Contacts() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Залишаймося на зв’язку!</h2>
      <div className={styles.socials}>
        <Link
          href="https://www.linkedin.com/in/vitaliitelychko/"
          target="_blank"
          className={styles.social}
        >
          <LinkedinIcon className={styles.socialLogo} />
          <p>Linkedin</p>
        </Link>
        <Link
          href="https://www.instagram.com/vitaliitelychko"
          target="_blank"
          className={styles.social}
        >
          <InstagramIcon className={styles.socialLogo} />
          <p>Instagram</p>
        </Link>
        <Link
          href="https://t.me/vitalii_telychko"
          target="_blank"
          className={styles.social}
        >
          <TelegramLogoIcon className={styles.socialLogo} />
          <p>Telegram</p>
        </Link>
      </div>
    </section>
  );
}
