"use client";

import { useFormStatus } from "react-dom";
import styles from "./new.module.css";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.submit}>
      {pending ? "Створення..." : "Створити"}
    </button>
  );
}
