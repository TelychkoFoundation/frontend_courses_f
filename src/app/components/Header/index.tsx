import { Dropdown, AvatarSkeleton, AuthButton } from "@/components";
import Link from "next/link";
import Logout from "./Logout";
import { Avatar } from "./Avatar";
import { Theme } from "./Theme";
import { Language } from "./Language";
import { GamificationXP } from "./GamificationXP";
import { Logo } from "@/components";
import { ChevronRightBoldIcon } from "@/images";
import { useSession } from "next-auth/react";
import { useAuth, useDeviceType, DeviceType, DeviceTypes } from "@/hooks";
import { dropdownLinks } from "@/constants";
import styles from "./index.module.css";
import { ProfileDropdownLink } from "@/typings";

export default function Header() {
  const { user } = useAuth();
  const { status } = useSession();
  const deviceType: DeviceType = useDeviceType();

  const renderRightIcon = () => {
    if (deviceType !== DeviceTypes.mobile) {
      return;
    }

    return (
      <div className={styles.rightIconContainer}>
        <ChevronRightBoldIcon className={styles.rightIcon} />
      </div>
    );
  };

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
          deviceType={deviceType}
        >
          {dropdownLinks.map(
            ({ id, name, icon, query }: ProfileDropdownLink) => (
              <li key={id}>
                <Link
                  href={`/profile?section=${query}`}
                  className={styles.dropdownItem}
                >
                  {icon}
                  <span className={styles.dropdownItemName}>{name}</span>
                  {renderRightIcon()}
                </Link>
              </li>
            ),
          )}
          <Logout icon={renderRightIcon()} />
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
