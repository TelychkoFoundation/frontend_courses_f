"use client";

import styles from "./index.module.css";
import Image from "next/image";
import { useUser } from "@/hooks";
import { AvatarSkeleton } from "@/components";

export const Avatar = () => {
  const { user } = useUser();

  if (!user || !user.photo_url) {
    return <AvatarSkeleton />;
  }

  return (
    <Image
      src={user.photo_url}
      alt="User Avatar"
      width={40}
      height={40}
      className={styles.logo}
    />
  );
};
