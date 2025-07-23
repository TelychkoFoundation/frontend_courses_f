"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { ITelegramUserData } from "@/typings";
import { getUser } from "@/actions";

interface UserContextType {
  user: ITelegramUserData | null;
  setUser: (user: ITelegramUserData | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ITelegramUserData | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await getUser();
      if (response?.success) {
        setUser(response.data);
      }
    };

    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
