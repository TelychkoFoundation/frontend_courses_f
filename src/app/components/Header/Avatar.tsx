import Image from "next/image";
import styles from "./index.module.css";

interface IAvatarProps {
  loading: boolean;
  url: string;
}

export const Avatar = ({ url }: IAvatarProps) => {
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
