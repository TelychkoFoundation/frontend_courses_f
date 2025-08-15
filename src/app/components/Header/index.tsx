import { Dropdown } from "@/components";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import Logout from "./Logout";
import { Avatar } from "./Avatar";
import { Theme } from "./Theme";
import { Language } from "./Language";
import { GamificationXP } from "./GamificationXP";
import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.logo}>Лого</p>
      <nav className={styles.nav}>
        <Language />
        <Theme />
        <GamificationXP />
        {/*<Link href="/admin/courses" className={styles.link}>*/}
        {/*  Адмін*/}
        {/*</Link>*/}
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
