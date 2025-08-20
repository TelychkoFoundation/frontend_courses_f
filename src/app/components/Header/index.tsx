import { Dropdown, Button, ButtonType, AvatarSkeleton } from "@/components";
import Link from "next/link";
import Logout from "./Logout";
import { Avatar } from "./Avatar";
import { Theme } from "./Theme";
import { Language } from "./Language";
import { GamificationXP } from "./GamificationXP";
import Logo from "./Logo";
import {
  HelpIcon,
  SettingsIcon,
  ShoppingCartIcon,
  StatisticsIcon,
  TelegramIcon,
  UserIcon,
} from "@/images";
import { useAuth, useDeviceType, DeviceTypes, DeviceType } from "@/hooks";
import styles from "./index.module.css";

const dropdownLinks = [
  { id: 1, name: "Мій профіль", icon: <UserIcon /> },
  { id: 2, name: "Історія покупок", icon: <ShoppingCartIcon /> },
  { id: 3, name: "Моя статистика", icon: <StatisticsIcon /> },
  { id: 4, name: "Налаштування акаунту", icon: <SettingsIcon /> },
  { id: 5, name: "Технічна підтримка", icon: <HelpIcon /> },
];

export default function Header() {
  const { isAuthenticated, user, loading } = useAuth();
  const deviceType: DeviceType = useDeviceType();

  const renderAuthSection = () => {
    if (loading) {
      return <AvatarSkeleton />;
    }

    if (isAuthenticated) {
      return (
        <>
          <GamificationXP />
          <Dropdown
            targetElement={
              user ? (
                <Avatar url={user.photo_url || ""} deviceType={deviceType} />
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
    }

    if (deviceType === DeviceTypes.mobile) {
      return (
        <Button type={ButtonType.TELEGRAM_MOBILE}>
          <TelegramIcon className={styles.telegram} />
        </Button>
      );
    }

    return (
      <Button type={ButtonType.TELEGRAM}>
        <TelegramIcon className={styles.telegram} />
        Увійти з Telegram
      </Button>
    );
  };

  return (
    <header className={styles.header}>
      <Logo deviceType={deviceType} isAuthenticated={isAuthenticated} />
      <nav className={styles.nav}>
        <Language />
        <Theme />
        {renderAuthSection()}
      </nav>
    </header>
  );
}
