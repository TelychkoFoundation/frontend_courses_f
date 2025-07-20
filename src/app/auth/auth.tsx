"use client";

import { useEffect, useState } from "react";
import { createUser, loginUser, getUser } from "@/lib";
import { IUser } from "@/typings";
import { useUser, useGlobal, useToast } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Auth() {
  const { setUser } = useUser();
  const { showToast } = useToast();
  const { setInitialLoading, setInitialLoadingMessage } = useGlobal();
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!window.onTelegramAuth) {
      window.onTelegramAuth = async (userData: IUser) => {
        setInitialLoading(true);
        setInitialLoadingMessage("Завантаження даних ...");

        const response = await getUser(String(userData.id));

        if (response && !response.success) {
          setInitialLoadingMessage("Створюємо користувача ...");

          const result = await createUser(userData);

          if (result && result.success) {
            setUser(result.data);
            router.push("/courses");
          } else {
            showToast(response.error as string, "error");
          }
        } else {
          const response = await loginUser(userData);

          if (response && !response.success) {
            showToast(response.error as string, "error");
          } else {
            setUser(response?.data);
            router.push("/courses");
          }
        }

        setInitialLoading(false);
        setInitialLoadingMessage("");
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
      {!scriptLoaded && <p>Завантажуємо Телеграм ...</p>}
      <div
        id="telegram-login-btn"
        style={{ display: scriptLoaded ? "block" : "none" }}
      />
    </div>
  );
}
