"use client";

import { useEffect, useState } from "react";
import { ITelegramUserData } from "@/typings";
import { useRouter } from "next/navigation";
import { loginUser, signup } from "@/actions";
import styles from "./page.module.css";

export default function AuthButton() {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!window.onTelegramAuth) {
      window.onTelegramAuth = async (userData: ITelegramUserData) => {
        try {
          setIsLoading(true);
          const loginResponse = await loginUser(userData);
          if (!loginResponse?.success) {
            await signup(userData);
          }

          router.push("/courses");
        } catch (error) {
          console.error("Authorization error:", error);
        } finally {
          setIsLoading(false);
        }
      };
    }

    const scriptId = "telegram-login-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute(
        "data-telegram-login",
        "telychko_frontend_courses_bot",
      );
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "false");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.id = scriptId;
      script.async = true;
      script.onload = () => setScriptLoaded(true);

      document.getElementById("telegram-login-btn")?.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);

  return (
    <div>
      {isLoading && <div className="loading-indicator">Завантаження...</div>}
      {!scriptLoaded && !isLoading && (
        <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
      )}
      {!isLoading ? (
        <div
          id="telegram-login-btn"
          style={{ display: scriptLoaded ? "block" : "none" }}
        />
      ) : null}
    </div>
  );
}
