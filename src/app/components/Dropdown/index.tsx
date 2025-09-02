"use client";

import { useRef, useState, ReactElement, ReactNode } from "react";
import { DeviceType, DeviceTypes, useOutsideClick } from "@/hooks";
import { ChevronLeftBoldIcon } from "@/images";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { PROFILE_ROUTE } from "@/constants";
import styles from "./index.module.css";

interface IUserDropdownProps {
  targetElement: ReactElement;
  children: ReactNode;
  deviceType?: DeviceType;
}

export default function Dropdown(props: IUserDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { status } = useSession();
  const pathname = usePathname();

  useOutsideClick(dropdownRef, () => setOpen(false));

  const openDropdown = () => {
    if (status !== "authenticated") {
      return;
    }

    if (pathname === PROFILE_ROUTE) {
      return;
    }

    setOpen(prev => !prev);
  };

  const renderDropdownContent = () => {
    if (!open) {
      return;
    }

    if (props.deviceType === DeviceTypes.mobile) {
      return (
        <div className={styles.dropdownMobile}>
          <section onClick={openDropdown}>
            <ChevronLeftBoldIcon className={styles.leftIcon} />{" "}
            <span>Меню налаштувань</span>
          </section>
          <ul className={styles.dropdownMobileList} onClick={openDropdown}>
            {props.children}
          </ul>
        </div>
      );
    }

    return (
      <ul className={styles.dropdown} onClick={openDropdown}>
        {props.children}
      </ul>
    );
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div onClick={openDropdown}>{props.targetElement}</div>
      {renderDropdownContent()}
    </div>
  );
}
