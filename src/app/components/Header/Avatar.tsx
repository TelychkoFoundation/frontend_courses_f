"use client";

import Image from "next/image";
import { useUser } from "@/hooks";
import { AvatarSkeleton } from "@/components";
import styles from "./index.module.css";

export const Avatar = () => {
  const { user } = useUser();

  if (!user || !user.photo_url) {
    return <AvatarSkeleton />;
  }

  return (
    <Image
      src={user.photo_url}
      alt="Logged in user avatar"
      width={48}
      height={48}
      className={styles.avatar}
    />
  );
};
