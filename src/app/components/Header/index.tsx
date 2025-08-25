import { Dropdown, AvatarSkeleton, AuthButton } from "@/components";
import Link from "next/link";
import Logout from "./Logout";
import { Avatar } from "./Avatar";
import { Theme } from "./Theme";
import { Language } from "./Language";
import { GamificationXP } from "./GamificationXP";
import { Logo } from "@/components";
import {
  HelpIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StatisticsIcon,
  UserIcon,
} from "@/images";
import { useSession } from "next-auth/react";
import { useAuth, useDeviceType, DeviceType } from "@/hooks";
import styles from "./index.module.css";

const dropdownLinks = [
  { id: 1, name: "Мій профіль", icon: <UserIcon /> },
  { id: 2, name: "Історія покупок", icon: <ShoppingCartIcon /> },
  { id: 3, name: "Моя статистика", icon: <StatisticsIcon /> },
  { id: 4, name: "Налаштування акаунту", icon: <SettingsIcon /> },
  { id: 5, name: "Технічна підтримка", icon: <HelpIcon /> },
];

export default function Header() {
  const { user } = useAuth();
  const { status } = useSession();
  const deviceType: DeviceType = useDeviceType();

  const renderAuthSection = () => {
    if (status === "loading") {
      return <AvatarSkeleton />;
    }

    if (status === "unauthenticated") {
      return <AuthButton deviceType={deviceType} />;
    }

    return (
      <>
        <GamificationXP xp={user?.xp} />
        <Dropdown
          targetElement={
            user ? (
              <Avatar url={user.image || ""} deviceType={deviceType} />
            ) : (
              <AvatarSkeleton />
            )
          }
        >
          {dropdownLinks.map(({ id, name, icon }) => (
            <li key={id}>
              <Link
                href={`/profile?section=${id}`}
                className={styles.dropdownItem}
              >
                {icon}
                <span className={styles.dropdownItemName}>{name}</span>
              </Link>
            </li>
          ))}
          <Logout />
        </Dropdown>
      </>
    );
  };

  return (
    <header className={`${styles.header} ${styles.opacity}`}>
      <Logo />
      <nav className={styles.nav}>
        <Language />
        <Theme />
        {renderAuthSection()}
      </nav>
    </header>
  );
}
