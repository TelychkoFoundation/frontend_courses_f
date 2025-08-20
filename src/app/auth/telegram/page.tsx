"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDeviceType, DeviceType, useAuth, useToast } from "@/hooks";
import { Logo } from "@/components";
import { ButtonLoadingIcon } from "@/images";
import { ITelegramUserData } from "@/typings";
import styles from "./page.module.css";

export default function TelegramAuthPage() {
  const router = useRouter();
  const deviceType: DeviceType = useDeviceType();
  const { login } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authData: ITelegramUserData = {
      id: searchParams.get("id"),
      first_name: searchParams.get("first_name"),
      last_name: searchParams.get("last_name"),
      username: searchParams.get("username"),
      auth_date: searchParams.get("auth_date"),
      hash: searchParams.get("hash"),
    };

    console.log(authData, "AUTHDATA");

    if (authData.id && authData.hash) {
      fetch("/api/auth/verify-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, "DATA");
          if (data.success) {
            login(authData);
          } else {
            showToast("Не вдалося перевірити дані Telegram", "error");
            // router.push("/");
          }
        })
        .catch(error => {
          showToast(`Помилка верифікації: ${error}`, "error");
          // router.push("/");
        });
    } else {
      showToast("Недостатньо даних для авторизації", "error");
      // router.push("/");
    }
  }, [window.location.search, router]);

  return (
    <div className={styles.container}>
      <Logo deviceType={deviceType} isAuthenticated={false} />
      <div className={styles.title}>
        <h1>Обробка входу...</h1>
        <p>Будь ласка, зачекайте трохи</p>
        <ButtonLoadingIcon className={styles.loader} />
      </div>
    </div>
  );
}
