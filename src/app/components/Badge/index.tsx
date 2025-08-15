import React from "react";
import styles from "./index.module.css";

export enum BadgeType {
  InDev = "in-dev",
  Basic = "basic",
  Advanced = "advanced",
  Professional = "professional",
  New = "new",
  NotStarted = "not-started",
  Tag = "tag",
  Done = "done",
}

export enum BadgeSize {
  Small = "s",
  Large = "l",
}

interface BadgeProps {
  type: BadgeType;
  size?: BadgeSize;
  children?: React.ReactNode;
}

export const Badge = ({
  type,
  size = BadgeSize.Small,
  children,
}: BadgeProps) => {
  const className = `${styles.badge} ${styles[type]} ${styles[size]}`;

  return <span className={className}>{children || type}</span>;
};
