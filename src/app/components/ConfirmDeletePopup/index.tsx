"use client";

import { useEffect } from "react";
import styles from "./popup.module.css";

interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  courseTitle?: string;
}

export default function ConfirmDeletePopup({
  onConfirm,
  onCancel,
  courseTitle,
}: ConfirmDeletePopupProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onCancel]);

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h3>Видалити курс {courseTitle} ?</h3>
        <p>Це дію не можна скасувати.</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>
            Скасувати
          </button>
          <button onClick={onConfirm} className={styles.confirm}>
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
