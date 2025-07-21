"use client";

import { useState, ReactNode } from "react";
import styles from "../page.module.css";

interface IInactiveProps {
  id: string;
  children: ReactNode;
}

export default function Inactive({ id, children }: IInactiveProps) {
  const [shakeID, setShakeID] = useState<string | null>(null);

  const handleClick = () => {
    setShakeID(id);
    setTimeout(() => setShakeID(null), 1000);
  };

  return (
    <div
      className={`${styles.courseContainer} ${shakeID === id ? styles.shake : ""} ${styles.disabled}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
