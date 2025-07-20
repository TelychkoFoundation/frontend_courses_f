"use client";

import styles from "./index.module.css";
import { useGlobal } from "@/hooks";

export default function LoadingOverlay() {
  const { initialLoading, initialLoadingMessage } = useGlobal();

  if (!initialLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.blurBackground} />
      <div className={styles.loadingIcon}>
        <span className={styles.pulse} />
        <span className={styles.dot} />
      </div>
      {initialLoadingMessage && (
        <div className={styles.caption}>{initialLoadingMessage}</div>
      )}
    </div>
  );
}
