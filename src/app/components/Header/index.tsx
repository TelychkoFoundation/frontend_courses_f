import styles from "./index.module.css";
import { Dropdown } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import Logout from "./logout";
import { Avatar } from "./avatar";
import { Theme } from "./theme";
import { ServicesLink } from "./services";

export default function Header() {
  return (
    <header className={styles.header}>
      <Image
        src="/vercel.svg"
        alt="Mentor Avatar"
        width={40}
        height={40}
        className={styles.logo}
      />

      <nav className={styles.nav}>
        <Theme />
        <Link href="/admin/courses" className={styles.link}>
          Адмін
        </Link>
        <ServicesLink />
        <Dropdown targetElement={<Avatar />}>
          <Link href="/profile" className={styles.dropdownItem}>
            <FiUser size={16} />
            <span>Профіль</span>
          </Link>
          <div className={styles.divider} />
          <Logout />
        </Dropdown>
      </nav>
    </header>
  );
}
