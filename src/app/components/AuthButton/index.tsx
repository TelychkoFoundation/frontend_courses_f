"use client";

import { signIn } from "next-auth/react";
import { DeviceType, DeviceTypes } from "@/hooks";
import { GoogleIcon } from "./icons";
import styles from "./index.module.css";

interface IProps {
  deviceType: DeviceType;
}

export default function AuthButton({ deviceType }: IProps) {
  if (deviceType === DeviceTypes.mobile) {
    return (
      <div
        onClick={() => signIn("google", { redirectTo: "/courses" })}
        role="button"
        className={styles.googleButtonMobile}
      >
        <GoogleIcon />
      </div>
    );
  }

  return (
    <div
      onClick={() => signIn("google", { redirectTo: "/courses" })}
      role="button"
      className={styles.googleButton}
    >
      <GoogleIcon />
      <span>Увійти з Google</span>
    </div>
  );
}
