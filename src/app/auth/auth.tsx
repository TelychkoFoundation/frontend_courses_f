"use client";

import { useEffect, useState } from "react";
import { createUser, loginUser } from "../lib/postActions";
import { IUser } from "../models/User";
import { useUser } from "../hooks/useUser";
import { getUser } from "../lib/getActions";
import { useGlobal } from "../hooks/useGlobal";

export default function Auth() {
  const { setUser } = useUser();
  const { setInitialLoading, setInitialLoadingMessage } = useGlobal();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.onTelegramAuth) {
      window.onTelegramAuth = async (userData: IUser) => {
        setInitialLoading(true);
        setInitialLoadingMessage("Завантаження даних ...");

        const response = await getUser();

        console.log(response);

        if (!response.success) {
          const result = await createUser(userData);

          if (result.success) {
            setUser(result.data);
            window.location.href = "/courses";
          }
        } else {
          await loginUser(userData);
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
