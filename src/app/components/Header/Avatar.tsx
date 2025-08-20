import Image from "next/image";
import { DeviceType, DeviceTypes } from "@/hooks";
import styles from "./index.module.css";

interface IAvatarProps {
  url: string;
  deviceType: DeviceType;
}

export const Avatar = ({ url, deviceType }: IAvatarProps) => {
  return (
    <Image
      src={url as string}
      alt="Logged in user avatar"
      width={deviceType === DeviceTypes.desktop ? 48 : 40}
      height={deviceType === DeviceTypes.desktop ? 48 : 40}
      className={styles.avatar}
    />
  );
};
