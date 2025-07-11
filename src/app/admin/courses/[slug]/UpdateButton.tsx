"use client";

import { useFormStatus } from "react-dom";
import styles from "../course.module.css";

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.submit}>
      {pending ? "Оновлюю..." : "Оновити"}
    </button>
  );
}
