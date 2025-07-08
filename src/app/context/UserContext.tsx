"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../models/User";
import { createDBConnection, getCookieToken, getUser } from "../lib/getActions";
import { useGlobal } from "../hooks/useGlobal";
import { useToast } from "../hooks/useToast";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { setInitialLoading, setInitialLoadingMessage } = useGlobal();
  const { showToast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const initialCheck = async () => {
      setInitialLoading(true);
      setInitialLoadingMessage("Налаштування даних ...");

      await createDBConnection();

      setInitialLoadingMessage("Перевірка токену ...");

      const token = await getCookieToken();

      if (token) {
        setInitialLoadingMessage("Завантаження даних користувача ...");

        const response = await getUser(token);

        if (response && response.success) {
          setUser(response.data);
        } else {
          router.push("/");
          showToast(response?.error as string, "error");
        }
      } else {
        router.push("/");
      }

      setInitialLoading(false);
      setInitialLoadingMessage("");
    };

    initialCheck();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
