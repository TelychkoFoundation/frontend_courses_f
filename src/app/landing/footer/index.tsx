import Link from "next/link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>FOP Telychko V.</p>
        <Link href="/policy">
          <p>Privacy policy</p>
        </Link>
        <Link href="/terms">
          <p>Terms of use</p>
        </Link>
        <p>Design by Nadiia</p>
      </div>
    </footer>
  );
}
