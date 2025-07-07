"use client";

import { useEffect } from "react";
import { createUser } from "../lib/postActions";
import { IUser } from "../models/User";

export default function Auth() {
  // useEffect(() => {
  //   console.log("Auth");
  //   // Створюємо глобальну функцію, яку Telegram викличе
  //   (window as any).onTelegramAuth = async (userData: IUser) => {
  //     const response = await createUser(userData);
  //
  //     if (response.success) {
  //       window.location.href = "/courses";
  //     }
  //   };
  //
  //   const scriptId = "telegram-login-script";
  //   if (document.getElementById(scriptId)) return; // вже є
  //
  //   const script = document.createElement("script");
  //   script.src = "https://telegram.org/js/telegram-widget.js?22";
  //   script.setAttribute("data-telegram-login", "telychko_frontend_courses_bot"); // 👈 заміни на свого бота
  //   script.setAttribute("data-size", "large");
  //   script.setAttribute("data-userpic", "false");
  //   script.setAttribute("data-request-access", "write");
  //   script.setAttribute("data-onauth", "onTelegramAuth(user)"); // 👈 виклик глобальної функції
  //   script.id = scriptId;
  //   script.async = true;
  //
  //   console.log(document.getElementById("telegram-login-btn"), script);
  //   document.getElementById("telegram-login-btn")?.appendChild(script);
  //
  //   // Cleanup
  //   return () => {
  //     console.log("unmount");
  //     document.getElementById(scriptId)?.remove();
  //   };
  // }, []);

  console.log("RENDER");

  (window as any).onTelegramAuth = async (userData: IUser) => {
    const response = await createUser(userData);

    if (response.success) {
      window.location.href = "/courses";
    }
  };

  const scriptId = "telegram-login-script";
  if (document.getElementById(scriptId)) return; // вже є

  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?22";
  script.setAttribute("data-telegram-login", "telychko_frontend_courses_bot"); // 👈 заміни на свого бота
  script.setAttribute("data-size", "large");
  script.setAttribute("data-userpic", "false");
  script.setAttribute("data-request-access", "write");
  script.setAttribute("data-onauth", "onTelegramAuth(user)"); // 👈 виклик глобальної функції
  script.id = scriptId;
  script.async = true;

  console.log(document.getElementById("telegram-login-btn"), script);
  document.getElementById("telegram-login-btn")?.appendChild(script);

  return <div id="telegram-login-btn" />;
}
