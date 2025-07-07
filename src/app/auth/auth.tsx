"use client";

import { useEffect, useContext } from "react";
import { createUser } from "../lib/postActions";
import { IUser } from "../models/User";
import { UserContext } from "../context/UserContext";

export default function Auth() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!(window as any).onTelegramAuth) {
      (window as any).onTelegramAuth = async (userData: IUser) => {
        const result = await createUser(userData);

        if (result.success) {
          setUser(result.data);
          window.location.href = "/courses";
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

      document.getElementById("telegram-login-btn")?.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  });

  return <div id="telegram-login-btn" />;
}
