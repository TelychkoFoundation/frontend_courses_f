import styles from "./index.module.css";
import { Dropdown } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
// import Logout from "./logout";
import { Avatar } from "./avatar";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.avatars}>
        <Image
          src="/vercel.svg"
          alt="Mentor Avatar"
          width={40}
          height={40}
          className={styles.avatar}
        />
      </div>

      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Link href="/admin/courses" className={styles.link}>
            Адмін
          </Link>
          <Link href="/services" className={styles.link}>
            Послуги
          </Link>
        </nav>

        <Dropdown targetElement={<Avatar />}>
          <Link href="/profile" className={styles.dropdownItem}>
            <FiUser size={16} />
            <span>Профіль</span>
          </Link>
          <div className={styles.divider} />
          {/*<Logout />*/}
        </Dropdown>
      </div>
    </header>
  );
}
