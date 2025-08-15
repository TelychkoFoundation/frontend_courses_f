import { ReactNode } from "react";
import styles from "./index.module.css";

interface ITgCircleProps {
  children: ReactNode;
}

export default function TgCircle({ children }: ITgCircleProps) {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
      >
        <circle opacity="0.1" cx="28" cy="28" r="28" fill="#2DA2DC" />
      </svg>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
