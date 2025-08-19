import { Dropdown, Button, ButtonType } from "@/components";
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
import { useAuth } from "@/hooks";
import styles from "./index.module.css";

const dropdownLinks = [
  { id: 1, name: "Мій профіль", icon: <UserIcon /> },
  { id: 2, name: "Історія покупок", icon: <ShoppingCartIcon /> },
  { id: 3, name: "Моя статистика", icon: <StatisticsIcon /> },
  { id: 4, name: "Налаштування акаунту", icon: <SettingsIcon /> },
  { id: 5, name: "Технічна підтримка", icon: <HelpIcon /> },
];

export default function Header() {
  const { isAuthenticated, loading, user } = useAuth();

  const renderAuthSection = () => {
    if (isAuthenticated) {
      return (
        <>
          <GamificationXP />
          <Dropdown
            targetElement={
              <Avatar loading={loading} url={user?.photo_url as string} />
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

    return (
      <Button type={ButtonType.TELEGRAM}>
        <TelegramIcon className={styles.telegram} />
        Увійти з Telegram
      </Button>
    );
  };

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        <Language />
        <Theme />
        {renderAuthSection()}
      </nav>
    </header>
  );
}
