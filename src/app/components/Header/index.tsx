"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../lib/deleteActions";
import { useRouter } from "next/navigation";
import { useUser } from "../../hooks/useUser";

export default function Header() {
  const router = useRouter();
  const { setUser, user } = useUser();

  const onLogout = async () => {
    setUser(null);
    await logout();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.avatars}>
        <Image
          src={user?.photo_url || "./next.svg"}
          alt="Mentor Avatar"
          width={40}
          height={40}
          className={styles.avatar}
        />
        <Image
          src={user?.photo_url || "./next.svg"}
          alt="User Avatar"
          width={40}
          height={40}
          className={styles.avatar}
        />
      </div>

      <nav className={styles.nav}>
        <Link href="/admin/courses" className={styles.link}>
          Адмін
        </Link>
        <Link href="/profile" className={styles.link}>
          Профіль
        </Link>
        <button onClick={onLogout} className={styles.logout}>
          <FiLogOut size={20} />
        </button>
      </nav>
    </header>
  );
}
