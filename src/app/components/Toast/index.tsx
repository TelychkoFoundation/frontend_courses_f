"use client";

import { useToast } from "../../hooks/useToast";
import styles from "./toast.module.css";

export default function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className={styles.toastContainer}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => hideToast(toast.id)}
        >
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
