import Image from "next/image";
import { AvatarSkeleton } from "@/components";
import styles from "./index.module.css";

interface IAvatarProps {
  loading: boolean;
  url: string;
}

export const Avatar = ({ loading, url }: IAvatarProps) => {
  if (loading) {
    return <AvatarSkeleton />;
  }

  return (
    <Image
      src={url as string}
      alt="Logged in user avatar"
      width={48}
      height={48}
      className={styles.avatar}
    />
  );
};
