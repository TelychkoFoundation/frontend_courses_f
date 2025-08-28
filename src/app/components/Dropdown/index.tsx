"use client";

import { useRef, useState, ReactElement, ReactNode } from "react";
import { useOutsideClick } from "@/hooks";
import { useSession } from "next-auth/react";
import styles from "./index.module.css";

interface IUserDropdownProps {
  targetElement: ReactElement;
  children: ReactNode;
}

export default function Dropdown(props: IUserDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { status } = useSession();

  useOutsideClick(dropdownRef, () => setOpen(false));

  const openDropdown = () => {
    if (status !== "authenticated") {
      return;
    }

    setOpen(prev => !prev);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.targetElementWrapper} onClick={openDropdown}>
        {props.targetElement}
      </div>
      {open && (
        <ul className={styles.dropdown} onClick={openDropdown}>
          {open ? props.children : null}
        </ul>
      )}
    </div>
  );
}
