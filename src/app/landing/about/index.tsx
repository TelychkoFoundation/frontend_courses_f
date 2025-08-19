import Link from "next/link";
import { InstagramIcon, LinkedinIcon, TelegramLogoIcon } from "@/images";
import styles from "./index.module.css";

export default function About() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src="/123.png" alt="boo" />
        </div>
        <div className={styles.details}>
          <span className={styles.teacher}>викладач</span>
          <div className={styles.aboutContainer}>
            <h2>Віталій Теличко</h2>
            <div className={styles.innerContainer}>
              <p>
                Lead Software Engineer <br /> Викладач і ментор Front-End
                розробників
              </p>
              <div className={styles.statistics}>
                <section>
                  <p>10+</p>
                  <span>років в ІТ</span>
                </section>
                <section>
                  <p>600+</p>
                  <span>учнів Front-End</span>
                </section>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </section>
  );
}
