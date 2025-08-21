"use client";

import { signIn } from "next-auth/react";
import { GoogleIcon } from "./icons";
import styles from "./index.module.css";

export default function AuthButton() {
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
