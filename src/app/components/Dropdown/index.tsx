"use client";

import styles from "./index.module.css";
import { useOutsideClick } from "@/hooks";
import { useRef, useState, ReactElement, ReactNode } from "react";

interface IUserDropdownProps {
  targetElement: ReactElement;
  children: ReactNode;
}

export default function Dropdown(props: IUserDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownRef, () => setOpen(false));

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div
        className={styles.targetElementWrapper}
        onClick={() => setOpen(prev => !prev)}
      >
        {props.targetElement}
      </div>
      {open && (
        <div className={styles.dropdown} onClick={() => setOpen(prev => !prev)}>
          {open ? props.children : null}
        </div>
      )}
    </div>
  );
}
