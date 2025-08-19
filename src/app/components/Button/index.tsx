import { FC, MouseEvent, ReactNode } from "react";
import { ButtonLoadingIcon } from "@/images";
import styles from "./index.module.css";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINE = "outline",
  TELEGRAM = "telegram",
  NUMBER = "number",
  PLAY = "play",
}

interface ButtonProps {
  type?: ButtonType;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  id?: string;
}

export const Button: FC<ButtonProps> = ({
  type = ButtonType.PRIMARY,
  onClick,
  disabled = false,
  className = "",
  loading = false,
  children,
  id,
}) => {
  if (type === ButtonType.TELEGRAM) {
    return (
      <button id={id} className={styles.telegram} onClick={onClick}>
        {loading ? <ButtonLoadingIcon className={styles.loading} /> : children}
      </button>
    );
  }
  if (type === ButtonType.NUMBER) {
    return (
      <button
        className={`${styles[type]} ${disabled ? styles.disabled : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === ButtonType.PLAY) {
    return (
      <button
        className={`${styles[type]} ${disabled ? styles.disabled : ""} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? (
          <ButtonLoadingIcon className={styles.playLoading} />
        ) : (
          children
        )}
      </button>
    );
  }

  return (
    <button
      id={id}
      className={`${styles.baseButton} ${styles[type]} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      {loading ? <ButtonLoadingIcon className={styles.loading} /> : children}
    </button>
  );
};
