"use client";

import {
  useEffect,
  ReactNode,
  useState,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import { useAuth, useToast } from "@/hooks";
// import { ButtonLoadingIcon } from "@/images";
import { checkIsProduction } from "@/utils";
import { ITelegramUserData } from "@/typings";
import styles from "./index.module.css";

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
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const { login } = useAuth();

  useEffect(() => {
    if (checkIsProduction()) {
      if (!window.onTelegramAuth) {
        window.onTelegramAuth = async (userData: ITelegramUserData) => {
          try {
            setLoading(true);
            login(userData, callbackRoute); // Реальний логін
          } catch (error) {
            showToast((error as Error).message);
            console.error("Authorization error:", error);
          } finally {
            setLoading(false);
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
        script.setAttribute("data-userpic", "false");
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-onauth", "onTelegramAuth(user)");
        script.id = scriptId;
        script.async = true;
        script.onload = () => setScriptLoaded(true);

        document.body.appendChild(script);
      }
    } else {
      setScriptLoaded(false);
    }

    return () => {
      const script = document.getElementById("telegram-login-script");
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleMockLogin = () => {
    console.log("Mock login initiated...");
    setLoading(true);
    setTimeout(() => {
      login(mockUser, callbackRoute); // Логін через моки в локальному середовищі
      setLoading(false);
    }, 1000);
  };

  const handleTelegramLogin = () => {
    console.log("Telegram login button clicked...");
  };

  return (
    <div>
      <div
        onClick={
          scriptLoaded && checkIsProduction()
            ? handleTelegramLogin
            : handleMockLogin
        }
        className={styles.authWrapper}
      >
        {Children.map(children, child => {
          if (isValidElement(child)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return cloneElement(child, { loading });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default TelegramLogin;

// <button onClick={boo}>mock</button>
// const boo = async () => {
//   try {
//     setIsLoading(true);
//     login(mockUser, callbackRoute);
//   } catch (error) {
//     console.error("Authorization error:", error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// <div>
//   {isLoading && <div className="loading-indicator">Завантаження...</div>}
//   {!scriptLoaded && !isLoading && <div />}
//   {!isLoading ? (
//     <div
//       id="telegram-login-btn"
//       style={{ display: scriptLoaded ? "block" : "none" }}
//     />
//   ) : null}
// </div>;
