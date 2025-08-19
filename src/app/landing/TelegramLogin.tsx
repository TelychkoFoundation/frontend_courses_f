"use client";

import { useEffect, ReactNode, useState } from "react";
import { useAuth, useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { ITelegramUserData } from "@/typings";

const mockUser = {
  id: 388906921,
  first_name: "Vitalii",
  last_name: "Telychko",
  username: "vitalii_telychko",
  photo_url:
    "https://t.me/i/userpic/320/z4xccDXY19G8ATVczACbA6n4rSX7rHUYP7zchRCwR_8.jpg",
  auth_date: 1752256612,
  hash: "e4b4798625189e3cafe96e564599fe1818fd4746b0208314dd692912203f72ec",
};

interface ITelegramLoginProps {
  children: ReactNode;
  callbackRoute: string;
}

const TelegramLogin = ({ children, callbackRoute }: ITelegramLoginProps) => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (!window.onTelegramAuth) {
      window.onTelegramAuth = async (userData: ITelegramUserData) => {
        try {
          setIsLoading(true);
          login(userData, callbackRoute);
          router.push("/courses");
        } catch (error) {
          showToast((error as Error).message);
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

  const boo = async () => {
    try {
      setIsLoading(true);
      login(mockUser, callbackRoute);
      router.push("/courses");
    } catch (error) {
      console.error("Authorization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={boo}>mock</button>
      {isLoading && <div className="loading-indicator">Завантаження...</div>}
      {!scriptLoaded && !isLoading && <div />}
      {!isLoading ? (
        <div
          id="telegram-login-btn"
          style={{ display: scriptLoaded ? "block" : "none" }}
        />
      ) : null}
    </div>
  );
};

export default TelegramLogin;
