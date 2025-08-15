import { FC, MouseEvent, ReactNode } from "react";
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
  children: ReactNode;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type = ButtonType.PRIMARY,
  onClick,
  disabled = false,
  className = "",
  loading = false,
  children,
}) => {
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
        className={`${styles[type]} ${disabled ? styles.disabled : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0ZM34.0322 26.334C32.693 25.5753 31.0348 26.5506 31.0469 28.0898L31.2393 52.3379C31.2515 53.8774 32.9258 54.8263 34.2529 54.0459L55.1562 41.7549C56.483 40.9743 56.4672 39.0501 55.1279 38.291L34.0322 26.334Z"
            fill="#49CA8E"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      className={`${styles.baseButton} ${styles[type]} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
        >
          <path
            d="M9.84375 1.09375V3.90625C9.84375 4.39844 9.45703 4.75 9 4.75C8.50781 4.75 8.15625 4.39844 8.15625 3.90625V1.09375C8.15625 0.636719 8.50781 0.25 9 0.25C9.45703 0.25 9.84375 0.636719 9.84375 1.09375ZM9.84375 14.5938V17.4062C9.84375 17.8984 9.45703 18.25 9 18.25C8.50781 18.25 8.15625 17.8984 8.15625 17.4062V14.5938C8.15625 14.1367 8.50781 13.75 9 13.75C9.45703 13.75 9.84375 14.1367 9.84375 14.5938ZM0 9.25C0 8.79297 0.351562 8.40625 0.84375 8.40625H3.65625C4.11328 8.40625 4.5 8.79297 4.5 9.25C4.5 9.74219 4.11328 10.0938 3.65625 10.0938H0.84375C0.351562 10.0938 0 9.74219 0 9.25ZM14.3438 8.40625H17.1562C17.6133 8.40625 18 8.79297 18 9.25C18 9.74219 17.6133 10.0938 17.1562 10.0938H14.3438C13.8516 10.0938 13.5 9.74219 13.5 9.25C13.5 8.79297 13.8516 8.40625 14.3438 8.40625ZM15.3633 2.88672C15.6797 3.23828 15.6797 3.76562 15.3633 4.08203L13.3594 6.08594C13.043 6.40234 12.4805 6.40234 12.1641 6.08594C11.8477 5.76953 11.8477 5.20703 12.1641 4.89062L14.168 2.88672C14.4844 2.57031 15.0117 2.57031 15.3633 2.88672ZM5.80078 13.6445L3.79688 15.6133C3.48047 15.9648 2.95312 15.9648 2.63672 15.6133C2.28516 15.2969 2.28516 14.7695 2.63672 14.4531L4.60547 12.4492C4.92188 12.1328 5.48438 12.1328 5.80078 12.4492C6.11719 12.7656 6.11719 13.293 5.80078 13.6445ZM2.63672 2.88672C2.95312 2.57031 3.48047 2.57031 3.79688 2.88672L5.80078 4.89062C6.11719 5.20703 6.11719 5.76953 5.80078 6.08594C5.48438 6.40234 4.95703 6.40234 4.60547 6.08594L2.63672 4.08203C2.28516 3.76562 2.28516 3.23828 2.63672 2.88672ZM13.3594 12.4492L15.3633 14.4531C15.6797 14.7695 15.6797 15.2969 15.3633 15.6133C15.0117 15.9648 14.4844 15.9648 14.168 15.6133L12.1641 13.6445C11.8477 13.3281 11.8477 12.7656 12.1641 12.4492C12.4805 12.1328 13.043 12.1328 13.3594 12.4492Z"
            fill={type !== ButtonType.PRIMARY ? "#181818" : "#fff"}
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
